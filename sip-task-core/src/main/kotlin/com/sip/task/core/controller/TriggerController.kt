package com.sip.task.core.controller

import com.sip.task.core.context.ExecutorContext
import com.sip.task.core.dto.ResponseDto
import org.apache.commons.lang.StringUtils
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*

@RestController
class TriggerController {

    private val log = LoggerFactory.getLogger(this.javaClass)

    @PostMapping("/microschedule/{recordId}")
    @ResponseBody
    fun microschedule(@PathVariable recordId: Long, @RequestBody params: Map<String, Any>): ResponseDto {
        log.info("")
        val execCode = params["code"]?.toString()
        return if (StringUtils.isBlank(execCode)) {
            ResponseDto.fail("executorCode is null")
        } else {
            val executor = ExecutorContext.loadExecutor(execCode!!)?: ResponseDto.fail("instance of $execCode not found")
            ResponseDto.success()
        }
    }
}