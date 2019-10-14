package com.sip.task.admin.controller

import com.basicfu.sip.core.annotation.Insert
import com.basicfu.sip.core.annotation.Update
import com.basicfu.sip.core.model.Result
import com.sip.task.admin.model.po.QrtzTriggerJobVo
import com.sip.task.admin.model.vo.JobSuggestVo
import com.sip.task.admin.service.QrtzTriggerJobService
import org.quartz.SchedulerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/job")
class QrtzTriggerJobController {
    @Autowired
    lateinit var qrtzTriggerJobService: QrtzTriggerJobService

    @GetMapping("/get")
    fun get(id: Long): Result<Any> {
        return Result.success(qrtzTriggerJobService.get(id))
    }

    @GetMapping("/list")
    fun list(vo: QrtzTriggerJobVo): Result<Any> {
        return Result.success(qrtzTriggerJobService.list(vo))
    }

    @GetMapping("/suggest")
    fun suggest(vo: JobSuggestVo): Result<Any> {
        return Result.success(qrtzTriggerJobService.suggest(vo))
    }


    @PostMapping("/insert")
    fun insert(@Validated(Insert::class) @RequestBody vo: QrtzTriggerJobVo): Result<Any> {
        return Result.success(qrtzTriggerJobService.insert(vo))
    }

    @PostMapping("/update")
    fun update(@Validated(Update::class) @RequestBody vo: QrtzTriggerJobVo): Result<Any> {
        vo.updateTime = (System.currentTimeMillis() / 1000)
        vo.updateUser = 1
        return Result.success(qrtzTriggerJobService.update(vo))
    }

    @DeleteMapping("/delete")
    fun delete(@RequestBody ids: List<Long>): Result<Any> {
        return Result.success(qrtzTriggerJobService.delete(ids))
    }

    /**
     * 任务调度立即执行一次
     **/
    @PostMapping("/run/{id}")
    @Throws(SchedulerException::class)
    fun run(@PathVariable("id") id: Long): Result<Any> {
        return Result.success(qrtzTriggerJobService.run(id))
    }

    /**
     * 任务调度状态修改
     *
     * @param job 调度信息
     */
    @Transactional
    @Throws(SchedulerException::class)
    fun changeStatus(vo: QrtzTriggerJobVo): Int {
        var rows = 0
        rows = if (vo.enable == true) {
            qrtzTriggerJobService.resumeJob(vo)
        } else {
            qrtzTriggerJobService.pauseJob(vo)
        }
        return rows
    }


}
