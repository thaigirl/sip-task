package com.sip.task.admin.common

import com.sip.task.admin.common.util.JobTimeOutExution
import com.sip.task.admin.common.util.LogExecution
import com.sip.task.admin.common.util.ScheduleUtil
import org.quartz.Scheduler
import org.quartz.impl.matchers.GroupMatcher
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class TimerJob: CommandLineRunner {
    @Autowired
    lateinit var scheduler: Scheduler

    override fun run(vararg args: String?) {
        var jobKeys = scheduler.getJobKeys(GroupMatcher.anyGroup()).toMutableList()
        val iterator = jobKeys.iterator()
        while (iterator.hasNext()){
            val next = iterator.next()
            if (next.name.contains("TASK_CLASS_NAME")){
                iterator.remove()
            }
        }
        scheduler.deleteJobs(jobKeys)
//        ScheduleUtil.addTimerJob(scheduler, JobTimeOutExution::class.java)
//        ScheduleUtil.addTimerJob(scheduler, LogExecution::class.java)
    }

}
