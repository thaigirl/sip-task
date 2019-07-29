package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.service.BaseService
import com.github.pagehelper.PageInfo
import com.sip.task.admin.common.util.ScheduleUtil
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.mapper.QrtzTriggerJobMapper
import com.sip.task.admin.model.dto.QrtzTriggerExecutorDto
import com.sip.task.admin.model.po.QrtzTriggerExecutor
import com.sip.task.admin.model.po.QrtzTriggerJob
import com.sip.task.admin.model.po.QrtzTriggerJobDto
import com.sip.task.admin.model.po.QrtzTriggerJobVo
import com.sip.task.admin.model.vo.QrtzTriggerExecutorVo
import org.quartz.Scheduler
import org.quartz.SchedulerException
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.PostMapping

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

    fun list(vo: QrtzTriggerJobVo): PageInfo<QrtzTriggerJobDto> {
        return selectPage(example<QrtzTriggerJob> { })
    }

    fun all(): List<QrtzTriggerExecutorDto> {
        return to(mapper.selectAll())
    }

    fun insert(vo: QrtzTriggerJobVo): Int {
        val po = dealInsert(to<QrtzTriggerJob>(vo))
        return mapper.insertSelective(po)
    }

    fun update(vo: QrtzTriggerJobVo): Int {
        val po = dealUpdate(to<QrtzTriggerJob>(vo))
        return mapper.updateByPrimaryKeySelective(po)
    }

    fun delete(ids: List<Long>?): Int {
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
