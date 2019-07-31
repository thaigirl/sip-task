package com.sip.task.core.context

import com.sip.task.core.dto.StatusEnum
import com.sip.task.core.feign.TaskFeignClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

@Component
class FeignContext {

    @Autowired
    private lateinit var taskFeignClient: TaskFeignClient

    @PostConstruct
    fun init() {
        feignClient = taskFeignClient
    }

    companion object{
        private lateinit var feignClient: TaskFeignClient


        fun feedBackStatus(status: StatusEnum){
            feignClient.feedBackStatus(ExecutorContext.getCurrentTaskRecordId(),status.name)
        }
    }
}