package com.sip.task.core.feign

import org.springframework.cloud.openfeign.FeignClient

@FeignClient(value = "SIP-TASK-SERVER", url = "")
interface TaskFeignClient {


    fun feedBackStatus(recordId: Long, status: String)

    fun logger(level: String, recordId: Long, msg: String)

}