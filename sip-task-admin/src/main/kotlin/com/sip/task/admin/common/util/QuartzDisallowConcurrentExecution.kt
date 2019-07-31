package com.basicfu.sip.schedule.util

import com.sip.task.admin.model.po.QrtzTriggerJob
import org.quartz.DisallowConcurrentExecution
import org.quartz.JobExecutionContext

/**
 * 定时任务处理（禁止并发执行）
 */
@DisallowConcurrentExecution
class QuartzDisallowConcurrentExecution : AbstractQuartzJob() {
    @Throws(Exception::class)
    override fun doExecute(context: JobExecutionContext, job: QrtzTriggerJob) {
        JobInvokeUtil.invokeMethod(job)
    }
}
