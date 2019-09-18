package com.sip.sample

import com.sip.task.core.annotation.ScheduleTask
import com.sip.task.core.logger.TaskLogger
import org.springframework.stereotype.Component

/**
 * @author tianhu
 * @date 2019/9/6
 */
@Component
class TestTask{



    @ScheduleTask(code = "RELEASE_RESUME")
    fun test(name:String){
        print("job start")
        print("hello $name")
        val logger = TaskLogger.getLogger(this.javaClass)
        logger.info("终于跑通了1!")
        logger.info("终于跑通了2!")
        logger.info("终于跑通了3!")
    }

}
