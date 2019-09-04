package com.sip.task.admin.controller

import com.basicfu.sip.core.model.Result
import com.sip.task.admin.model.po.QrtzTriggerJobVo
import com.sip.task.admin.model.po.QrtzTriggerRecordVo
import com.sip.task.admin.service.QrtzTriggerRecordService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * @author tianhu
 * @date 2019/9/4
 */
@RestController
@RequestMapping("/record")
class QrtzTriggerRecordController{

    @Autowired
    lateinit var qrtzTriggerRecordService: QrtzTriggerRecordService

    @GetMapping("/list")
    fun list(vo: QrtzTriggerRecordVo): Result<Any> {
        return Result.success(qrtzTriggerRecordService.list(vo))
    }
}
