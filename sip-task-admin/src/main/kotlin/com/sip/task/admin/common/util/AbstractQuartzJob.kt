package com.basicfu.sip.schedule.util

import com.basicfu.sip.schedule.common.constants.ScheduleConstants
import com.sip.task.admin.model.po.QrtzTriggerJob
import org.quartz.JobExecutionContext
import org.quartz.JobExecutionException
import org.slf4j.LoggerFactory
import org.springframework.beans.BeanUtils
import java.util.*

/**
 * 抽象quartz调用
 */
abstract class AbstractQuartzJob : org.quartz.Job {

    @Throws(JobExecutionException::class)
    override fun execute(context: JobExecutionContext) {
        val job = QrtzTriggerJob()
        BeanUtils.copyProperties(context.mergedJobDataMap[ScheduleConstants.TASK_PROPERTIES]!!, job)
        try {
            if (job != null) {
                doExecute(1L, job)
            }
        } catch (e: Exception) {
        }

    }

    /**
     * 执行方法，由子类重载
     *
     * @param context 工作执行上下文对象
     * @param sysJob  系统计划任务
     * @throws Exception 执行过程中的异常
     */
    @Throws(Exception::class)
    protected abstract fun doExecute(recordId:Long,sysJob: QrtzTriggerJob)
}
