package com.sip.sample

import com.sip.task.core.annotation.ScheduleTask
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
    }

}