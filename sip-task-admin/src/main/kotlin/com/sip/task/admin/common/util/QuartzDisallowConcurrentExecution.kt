package com.sip.task.admin.common.util

import com.sip.task.admin.common.constants.ScheduleConstants
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.model.po.QrtzTriggerJob
import com.sip.task.admin.service.JobInvokeService
import org.quartz.DisallowConcurrentExecution
import org.quartz.JobExecutionContext
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * 定时任务处理（禁止并发执行）
 */

@Component
@DisallowConcurrentExecution
class QuartzDisallowConcurrentExecution : org.quartz.Job{
    @Autowired
    lateinit var executorMapper: QrtzTriggerExecutorMapper
    @Autowired
    lateinit var jobInvokeService: JobInvokeService
    override fun execute(context: JobExecutionContext) {
        val job = QrtzTriggerJob()
        BeanUtils.copyProperties(context.mergedJobDataMap[ScheduleConstants.TASK_PROPERTIES]!!, job)
        jobInvokeService.trigger(job)
    }



}

