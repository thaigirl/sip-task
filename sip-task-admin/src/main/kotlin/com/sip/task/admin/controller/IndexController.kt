package com.sip.task.admin.controller

import com.basicfu.sip.core.model.Result
import com.sip.task.admin.service.IndexService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * @author tianhu
 * @date 2019/10/14
 */
@RestController
@RequestMapping("/index")
class IndexController{

    @Autowired
    lateinit var indexService: IndexService



    @GetMapping("/info")
    fun index(): Result<Any>{
        return Result.success(indexService.index())
    }

    @GetMapping("/lineChartInfo")
    fun lineChartInfo(@RequestParam("startTime")startTime: Long?, @RequestParam("endTime")endTime: Long?): Result<Any>{
        return Result.success(indexService.triggerInfo(startTime,endTime))
    }

}
