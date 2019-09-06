package com.sip.task.core.feign

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(value = "SIP-TASK-SERVER", url = "")
interface TaskFeignClient {


    @PostMapping("/feedback/record/status")
    fun feedBackTaskStatus(@RequestParam("recordId") recordId: Long,
                           @RequestParam("status") status: String)
    @PostMapping("/feedback/logger/insert")
    fun logger(@RequestParam("recordId")recordId: Long,
               @RequestParam("msg") msg: String)

}
