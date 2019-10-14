package com.sip.task.admin.controller

import com.basicfu.sip.core.annotation.Insert
import com.basicfu.sip.core.annotation.Update
import com.basicfu.sip.core.model.Result
import com.sip.task.admin.model.vo.QrtzUserVo
import com.sip.task.admin.service.QrtzUserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user")
class QrtzUserController {
    @Autowired
    lateinit var qrtzUserService: QrtzUserService

    @PostMapping("/register")
    fun register(@Validated @RequestBody vo: QrtzUserVo): Result<Any> {
        vo.createTime = (System.currentTimeMillis() / 1000)
        vo.createUser = 1
        vo.updateTime = (System.currentTimeMillis() / 1000)
        vo.updateUser = 1
        return Result.success(qrtzUserService.insert(vo), "注册成功")
    }

    @PostMapping("/login")
    fun login(@Validated @RequestBody vo: QrtzUserVo): Result<Any> {
        return Result.success(qrtzUserService.login(vo))
    }

    @GetMapping("/logout")
    fun loginOut(): Any {
        return Result.success(qrtzUserService.logout(), "登出成功")
    }

    @GetMapping("/me")
    fun me(): Result<Any> {
        return Result.success(qrtzUserService.me())
    }

    @GetMapping("/get")
    fun get(id: Long): Result<Any> {
        return Result.success(qrtzUserService.get(id))
    }

    @GetMapping("/list")
    fun list(vo: QrtzUserVo): Result<Any> {
        return Result.success(qrtzUserService.list(vo))
    }

    @GetMapping("/all")
    fun all(): Result<Any> {
        return Result.success(qrtzUserService.all())
    }

    @PostMapping("/insert")
    fun insert(@Validated(Insert::class) @RequestBody vo: QrtzUserVo): Result<Any> {
        vo.createTime = (System.currentTimeMillis() / 1000)
        vo.createUser = 1
        vo.updateTime = (System.currentTimeMillis() / 1000)
        vo.updateUser = 1
        return Result.success(qrtzUserService.insert(vo))
    }

    @PostMapping("/update")
    fun update(@Validated(Update::class) @RequestBody vo: QrtzUserVo): Result<Any> {
        vo.updateTime = (System.currentTimeMillis() / 1000)
        vo.updateUser = 1
        return Result.success(qrtzUserService.update(vo))
    }

    @DeleteMapping("/delete")
    fun delete(@RequestBody ids: List<Long>): Result<Any> {
        return Result.success(qrtzUserService.delete(ids))
    }

}
