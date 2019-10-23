package com.sip.task.admin.common.util

import com.sip.task.admin.service.FeedBackService
import org.quartz.DisallowConcurrentExecution
import org.quartz.JobExecutionContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
@DisallowConcurrentExecution
class LogExecution : org.quartz.Job {

    @Autowired
    lateinit var feedBackService: FeedBackService

    override fun execute(context: JobExecutionContext) {
        feedBackService.handleLog()
    }


}
