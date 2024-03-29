package com.sip.task.admin.controller

import com.basicfu.sip.core.model.Result
import com.sip.task.admin.model.po.QrtzTriggerJobVo
import com.sip.task.admin.model.po.QrtzTriggerRecordVo
import com.sip.task.admin.service.QrtzTriggerRecordService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

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
    @GetMapping("/log/{id}")
    fun log(@PathVariable("id")id: Long): Result<Any> {
        return Result.success(qrtzTriggerRecordService.getRecordLog(id))
    }
    @PostMapping("/delete/{id}")
    fun delete(@PathVariable("id")id: Long): Result<Any> {
        return Result.success(qrtzTriggerRecordService.delete(id))
    }
}
