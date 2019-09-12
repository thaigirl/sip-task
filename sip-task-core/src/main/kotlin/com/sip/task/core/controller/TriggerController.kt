package com.sip.task.core.controller

import com.alibaba.fastjson.JSON
import com.sip.task.core.context.ExecutorContext
import com.sip.task.core.dto.ResponseDto
import org.apache.commons.lang.StringUtils
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/schedule")
class TriggerController {

    private val log = LoggerFactory.getLogger(this.javaClass)

    @PostMapping("/{recordId}")
    @ResponseBody
    fun trigger(@PathVariable recordId: Long?, @RequestBody params: Map<String, Any>): ResponseDto {
        log.info("start scheduling task, 【recordId:$recordId】,【parameters:${JSON.toJSONString(params)}】")
        val execCode = params["code"]?.toString()
        return when {
            StringUtils.isBlank(execCode) -> ResponseDto.fail("executorCode can not be null")
            recordId == null -> ResponseDto.fail("recordId can not be null")
            else -> {
                ExecutorContext.setCurrentTaskRecordId(recordId)
                val executor = ExecutorContext.loadExecutor(execCode!!) ?: return ResponseDto.fail("instance of $execCode not found")
                executor.exec(params)
                return ResponseDto.success()
            }
        }
    }
}
