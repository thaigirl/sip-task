package com.sip.task.admin.controller

import com.sip.task.admin.model.vo.FeedBackTaskStatusVo
import com.sip.task.admin.model.vo.LoggerVo
import com.sip.task.admin.service.FeedBackService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/feedback")
class FeedBackController {

    @Autowired
    lateinit var feedBackService: FeedBackService

    @PostMapping("/record/status")
    fun feedBackTaskStatus(vo: FeedBackTaskStatusVo) {
        feedBackService.updateRecordStatus(vo)
    }

    @PostMapping("/logger/insert")
    fun logger(vo: LoggerVo) {
        feedBackService.insertLogger(vo)
    }
}