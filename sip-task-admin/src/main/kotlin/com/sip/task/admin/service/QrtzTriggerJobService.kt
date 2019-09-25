package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.exception.CustomException
import com.basicfu.sip.core.service.BaseService
import com.sip.task.admin.common.exception.TaskException
import com.github.pagehelper.PageInfo
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.common.util.ScheduleUtil
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.mapper.QrtzTriggerJobMapper
import com.sip.task.admin.mapper.QrtzTriggerJobParamMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordMapper
import com.sip.task.admin.model.dto.QrtzTriggerExecutorDto
import com.sip.task.admin.model.po.*
import org.apache.commons.lang3.StringUtils
import org.quartz.Scheduler
import org.quartz.SchedulerException
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.util.CollectionUtils
import java.text.SimpleDateFormat
import javax.annotation.PostConstruct

/**
 * <p>
 * 定时任务调度日志表 服务实现类
 * </p>
 *
 * @author liyang
 * @since 2019-06-15
 */
@Service
class QrtzTriggerJobService : BaseService<QrtzTriggerJobMapper, QrtzTriggerJob>() {
    @Autowired
    lateinit var scheduler: Scheduler
    @Autowired
    lateinit var paramMapper: QrtzTriggerJobParamMapper
    @Autowired
    lateinit var executorMapper: QrtzTriggerExecutorMapper
    @Autowired
    lateinit var recordMapper: QrtzTriggerRecordMapper


    /**
     * 项目启动时，初始化定时器
     */
    @PostConstruct
    @Throws(SchedulerException::class, TaskException::class)
    fun init() {
        val jobList = mapper.selectAll()
        for (job in jobList) {
            val cronTrigger = ScheduleUtil.getCronTrigger(scheduler, job.id)
            // 如果不存在，则创建
            if (cronTrigger == null) {
                ScheduleUtil.createScheduleJob(scheduler, job)
            } else {
                ScheduleUtil.updateScheduleJob(scheduler, job)
            }
        }
    }

    fun list(vo: QrtzTriggerJobVo): PageInfo<QrtzTriggerJobDto> {
        val page = selectPage<QrtzTriggerJobDto>(example<QrtzTriggerJob> {
            andEqualTo { executorId = vo.executorId }
            andRightLike { name = vo.name }
            orderByDesc(QrtzTriggerJob::createTime)
        })
        if (page.list.isNotEmpty()) {
            val executorIds = page.list.map { it.executorId }
            val jobIds = page.list.map { it.id }
            val excutorMap = executorMapper.selectByIds(StringUtils.join(executorIds, ",")).associateBy({ it.id }, { it.name })
            val paramMap = paramMapper.selectByExample(example<QrtzTriggerJobParam> {
                andIn(QrtzTriggerJobParam::jobId, jobIds)
            }).groupBy { it.jobId }
            page.list.forEach {
                it.executorName = excutorMap[it.executorId]
                it.param = paramMap[it.id]
            }
        }
        return page
    }

    fun suggest(q: String?) :Any{
        return mapper.selectByExample(example<QrtzTriggerJob> {
            andRightLike{ name = q }
        })
    }

    @Transactional
    fun insert(vo: QrtzTriggerJobVo): Int {
        val po = dealInsert(to<QrtzTriggerJob>(vo))!!
        po.createTime = System.currentTimeMillis()
        po.createUser = 1
        po.updateTime = System.currentTimeMillis()
        po.updateUser = 1
        executorMapper.selectByPrimaryKey(vo.executorId) ?: throw CustomException("executor not found")
        if (mapper.selectCountByExample(example<QrtzTriggerJob> {
                    andEqualTo {
                        executorId = vo.executorId
                        code = vo.code
                    }
                }) > 0) throw CustomException("code already exist")
        //校验最小执行间隔时间

        val result = mapper.insertSelective(po)
        if (!CollectionUtils.isEmpty(vo.param)) {
            //校验重复key
            val param = vo.param!!
            checkParam(param)
            param.forEach { it.jobId = po.id }
            paramMapper.insertList(param)
        }
        ScheduleUtil.createScheduleJob(scheduler, po)
        return result
    }

    @Transactional
    fun update(vo: QrtzTriggerJobVo): Int {
        val po = dealUpdate(to<QrtzTriggerJob>(vo))!!
        po.updateUser = 1
        val exist = mapper.selectByPrimaryKey(vo.id)
        //修改执行策略的前置条件是没有未完成的任务
        if (po.strategy != exist.strategy) {
            //TODO 这里是否加锁待定
            if (recordMapper.selectCountByExample(example<QrtzTriggerRecord> {
                        andEqualTo { jobId = vo.id!! }
                        andIn(QrtzTriggerRecord::status, listOf(BaseEnum.JobStatus.WAIT_EXEC.name, BaseEnum.JobStatus
                                .RUNNING.name))
                    }) > 0) throw CustomException("有未执行完成的任务,不允许修改执行策略")
        }
        //TODO 校验最低运行间隔时间

        if (CollectionUtils.isEmpty(vo.param)) {
            paramMapper.deleteByExample(example<QrtzTriggerJobParam> {
                andEqualTo { jobId = vo.id }
            })
        } else {
            val existCount = paramMapper.selectCountByExample(example<QrtzTriggerJobParam> {
                andEqualTo { jobId = vo.id }
            })
            val param = vo.param!!
            checkParam(param)
            param.forEach { it.jobId = vo.id }
            //如果之前未配置过参数则直接新增
            if (existCount > 0) {
                //TODO 是否要考虑增量新增？
                paramMapper.deleteByExample(example<QrtzTriggerJobParam> {
                    andEqualTo { jobId = vo.id }
                })
            }
            paramMapper.insertList(vo.param!!)
        }
        val rows = mapper.updateByPrimaryKeySelective(po)
        ScheduleUtil.updateScheduleJob(scheduler, po)
        return rows
    }

    fun delete(ids: List<Long>?): Int {
        mapper.deleteByIds(ids?.joinToString(","))
        ids?.forEach { it ->
            ScheduleUtil.deleteScheduleJob(scheduler, it)
        }
        return deleteByIds(ids)
    }

    fun get(id: Long): QrtzTriggerJob? {
        return mapper.selectByPrimaryKey(id)
    }

    /**
     * 立即执行一次任务
     */
    @Transactional
    @Throws(SchedulerException::class)
    fun run(vo: QrtzTriggerJobVo) {
        ScheduleUtil.run(scheduler, mapper.selectByPrimaryKey(vo.id))
    }

    /**
     * 暂停任务
     */
    @Transactional
    @Throws(SchedulerException::class)
    fun pauseJob(vo: QrtzTriggerJobVo): Int {
        val po = QrtzTriggerJob()
        BeanUtils.copyProperties(vo, po)
        val rows = mapper.updateByPrimaryKey(po)
        if (rows > 0) {
            ScheduleUtil.pauseJob(scheduler, po.id)
        }
        return rows
    }

    /**
     * 恢复任务
     */
    @Transactional
    @Throws(SchedulerException::class)
    fun resumeJob(vo: QrtzTriggerJobVo): Int {
        val po = QrtzTriggerJob()
        BeanUtils.copyProperties(vo, po)
        val rows = mapper.updateByPrimaryKey(po)
        if (rows > 0) {
            ScheduleUtil.resumeJob(scheduler, po.id)
        }
        return rows
    }


    private fun checkParam(param: List<QrtzTriggerJobParam>) {
        param.groupBy { it.key }.forEach { (k, v) -> if (v.size > 1) throw CustomException("repeat key:$k") }
        //校验日期格式
        param.forEach {
            if (it.type == BaseEnum.ParamType.DATE.name) {
                try {
                    val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                    dateFormat.parse(it.value)
                } catch (e: Exception) {
                    throw CustomException("date format error")
                }
            }
        }
    }
}

