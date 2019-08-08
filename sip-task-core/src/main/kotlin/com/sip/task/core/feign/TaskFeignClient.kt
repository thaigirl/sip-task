package com.sip.task.core.feign

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping

@FeignClient(value = "SIP-TASK-SERVER", url = "")
interface TaskFeignClient {


    @PostMapping("/feedback/record/status")
    fun feedBackTaskStatus(recordId: Long, status: String)
    @PostMapping("/feedback/logger/insert")
    fun logger(recordId: Long, msg: String)

}