package com.sip.task.admin.controller

import com.basicfu.sip.core.annotation.Insert
import com.basicfu.sip.core.annotation.Update
import com.basicfu.sip.core.model.Result
import com.sip.task.admin.model.vo.QrtzTriggerExecutorVo
import com.sip.task.admin.service.QrtzTriggerExecutorService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/executor")
class QrtzTriggerExecutorController {
    @Autowired
    lateinit var qrtzTriggerExecutorService: QrtzTriggerExecutorService

    @GetMapping("/get")
    fun get(id: Long): Result<Any> {
        return Result.success(qrtzTriggerExecutorService.get(id))
    }

    @GetMapping("/list")
    fun list(vo: QrtzTriggerExecutorVo): Result<Any> {
        return Result.success(qrtzTriggerExecutorService.list(vo))
    }

    @GetMapping("/all")
    fun all(): Result<Any> {
        return Result.success(qrtzTriggerExecutorService.all())
    }

    @PostMapping("/insert")
    fun insert(@Validated(Insert::class) @RequestBody vo: QrtzTriggerExecutorVo): Result<Any> {
        vo.createTime = (System.currentTimeMillis() / 1000)
        vo.createUser = 1
        vo.updateTime = (System.currentTimeMillis() / 1000)
        vo.updateUser = 1
        return Result.success(qrtzTriggerExecutorService.insert(vo))
    }

    @PostMapping("/update")
    fun update(@Validated(Update::class) @RequestBody vo: QrtzTriggerExecutorVo): Result<Any> {
        vo.updateTime = (System.currentTimeMillis() / 1000)
        vo.updateUser = 1
        return Result.success(qrtzTriggerExecutorService.update(vo))
    }

    @DeleteMapping("/delete")
    fun delete(@RequestBody ids: List<Long>): Result<Any> {
        return Result.success(qrtzTriggerExecutorService.delete(ids))
    }

}
