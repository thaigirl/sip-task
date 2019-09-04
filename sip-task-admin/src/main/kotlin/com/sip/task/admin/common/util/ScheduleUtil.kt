package com.sip.task.admin.common.util

import com.basicfu.sip.schedule.common.constants.ScheduleConstants
import com.basicfu.sip.schedule.common.exception.TaskException
import com.basicfu.sip.schedule.util.QuartzDisallowConcurrentExecution
import com.sip.task.admin.model.po.QrtzTriggerJob
import org.quartz.*
import org.slf4j.LoggerFactory

/**
 * 定时任务工具类
 */
object ScheduleUtil {
    private val log = LoggerFactory.getLogger(ScheduleUtil::class.java)

    /**
     * 得到quartz任务类
     *
     * @param job 执行计划
     * @return 具体执行任务类
     */
    private fun getQuartzJobClass(job: QrtzTriggerJob): Class<out Job> {
        return QuartzDisallowConcurrentExecution::class.java
    }

    /**
     * 获取触发器key
     */
    fun getTriggerKey(jobId: Long?): TriggerKey {
        return TriggerKey.triggerKey(ScheduleConstants.TASK_CLASS_NAME + jobId!!)
    }

    /**
     * 获取jobKey
     */
    fun getJobKey(jobId: Long?): JobKey {
        return JobKey.jobKey(ScheduleConstants.TASK_CLASS_NAME + jobId!!)
    }

    /**
     * 获取表达式触发器
     */
    fun getCronTrigger(scheduler: Scheduler, jobId: Long?): CronTrigger? {
        try {
            return scheduler.getTrigger(getTriggerKey(jobId)) as CronTrigger
        } catch (e: Exception) {
            log.error("getCronTrigger 异常：", e)
        }
        return null
    }

    /**
     * 创建定时任务
     */
    @Throws(SchedulerException::class, TaskException::class)
    fun createScheduleJob(scheduler: Scheduler, job: QrtzTriggerJob) {
        val jobClass = getQuartzJobClass(job)
        // 构建job信息
        val jobDetail = JobBuilder.newJob(jobClass).withIdentity(getJobKey(job.id)).build()
        // 表达式调度构建器
        var cronScheduleBuilder = CronScheduleBuilder.cronSchedule(job.cron)
        // 按新的cronExpression表达式构建一个新的trigger
        val trigger = TriggerBuilder.newTrigger().withIdentity(getTriggerKey(job.id))
                .withSchedule<CronTrigger>(cronScheduleBuilder).build()
        // 放入参数，运行时的方法可以获取
        jobDetail.jobDataMap[ScheduleConstants.TASK_PROPERTIES] = job
        scheduler.scheduleJob(jobDetail, trigger)
        // 暂停任务
        if (job.enable == false) {
            pauseJob(scheduler, job.id)
        }
    }

    /**
     * 更新定时任务
     */
    @Throws(SchedulerException::class, TaskException::class)
    fun updateScheduleJob(scheduler: Scheduler, job: QrtzTriggerJob) {
        val jobKey = getJobKey(job.id)
        // 判断是否存在
        if (scheduler.checkExists(jobKey)) {
            // 先移除，然后做更新操作
            scheduler.deleteJob(jobKey)
        }
        createScheduleJob(scheduler, job)
    }

    /**
     * 立即执行任务
     */
    @Throws(SchedulerException::class)
    fun run(scheduler: Scheduler, job: QrtzTriggerJob) {
        // 参数
        val dataMap = JobDataMap()
        dataMap.put(ScheduleConstants.TASK_PROPERTIES, job)

        scheduler.triggerJob(getJobKey(job.id), dataMap)
    }

    /**
     * 暂停任务
     */
    @Throws(SchedulerException::class)
    fun pauseJob(scheduler: Scheduler, jobId: Long?) {
        scheduler.pauseJob(getJobKey(jobId))
    }

    /**
     * 恢复任务
     */
    @Throws(SchedulerException::class)
    fun resumeJob(scheduler: Scheduler, jobId: Long?) {
        scheduler.resumeJob(getJobKey(jobId))
    }

    /**
     * 删除定时任务
     */
    @Throws(SchedulerException::class)
    fun deleteScheduleJob(scheduler: Scheduler, jobId: Long?) {
        scheduler.deleteJob(getJobKey(jobId))
    }
}
