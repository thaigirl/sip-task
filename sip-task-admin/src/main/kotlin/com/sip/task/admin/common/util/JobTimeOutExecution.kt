package com.sip.task.admin.common.util

import com.sip.task.admin.service.QrtzTriggerRecordService
import org.quartz.DisallowConcurrentExecution
import org.quartz.JobExecutionContext
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
@DisallowConcurrentExecution
class JobTimeOutExution : org.quartz.Job {
    @Autowired
    lateinit var recordService: QrtzTriggerRecordService

    override fun execute(context: JobExecutionContext) {
        recordService.handleTimeOutRecord()
    }


}
