package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.service.BaseService
import com.basicfu.sip.schedule.common.exception.TaskException
import com.github.pagehelper.PageInfo
import com.sip.task.admin.common.util.ScheduleUtil
import com.sip.task.admin.mapper.QrtzTriggerJobMapper
import com.sip.task.admin.model.dto.QrtzTriggerExecutorDto
import com.sip.task.admin.model.po.QrtzTriggerJob
import com.sip.task.admin.model.po.QrtzTriggerJobDto
import com.sip.task.admin.model.po.QrtzTriggerJobVo
import org.quartz.Scheduler
import org.quartz.SchedulerException
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
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
        return selectPage(example<QrtzTriggerJob> { })
    }

    fun all(): List<QrtzTriggerExecutorDto> {
        return to(mapper.selectAll())
    }

    fun insert(vo: QrtzTriggerJobVo): Int {
        val po = dealInsert(to<QrtzTriggerJob>(vo))
        val rows = mapper.insertSelective(po)
        if (rows > 0 && po != null) {
            ScheduleUtil.createScheduleJob(scheduler, po)
        }
        return rows
    }

    fun update(vo: QrtzTriggerJobVo): Int {
        val po = dealUpdate(to<QrtzTriggerJob>(vo))
        val rows = mapper.updateByPrimaryKeySelective(po)
        if (rows > 0 && po != null) {
            ScheduleUtil.updateScheduleJob(scheduler, po)
        }
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
}
