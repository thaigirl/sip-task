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
            before(context, job)
            if (job != null) {
                doExecute(context, job)
            }
            after(context, job, null)
        } catch (e: Exception) {
            log.error("任务执行异常  - ：", e)
            after(context, job, e)
        }

    }

    /**
     * 执行前
     *
     * @param context 工作执行上下文对象
     * @param job  系统计划任务
     */
    protected fun before(context: JobExecutionContext, job: QrtzTriggerJob) {
        threadLocal.set(Date())
    }

    /**
     * 执行后
     *
     * @param context        工作执行上下文对象
     * @param sysScheduleJob 系统计划任务
     */
    protected fun after(context: JobExecutionContext, job: QrtzTriggerJob, e: Exception?) {
        threadLocal.remove()
    }

    /**
     * 执行方法，由子类重载
     *
     * @param context 工作执行上下文对象
     * @param sysJob  系统计划任务
     * @throws Exception 执行过程中的异常
     */
    @Throws(Exception::class)
    protected abstract fun doExecute(context: JobExecutionContext, sysJob: QrtzTriggerJob)

    companion object {
        private val log = LoggerFactory.getLogger(AbstractQuartzJob::class.java)

        /**
         * 线程本地变量
         */
        private val threadLocal = ThreadLocal<Date>()
    }
}
