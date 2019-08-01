package com.sip.task.core.feign

import org.springframework.cloud.openfeign.FeignClient

@FeignClient(value = "SIP-TASK-SERVER", url = "")
interface TaskFeignClient {


    fun feedBackTaskStatus(recordId: Long, status: String)

    fun logger(level: String, recordId: Long, msg: String)

}