package com.sip.task.core.context

import java.lang.reflect.Method

class ExecutorInstance {

    private var execCode: String? = null
    private var beanInstance: Any? = null
    private var beanClass: Class<out Any>? = null
    private var method: Method? = null

    /**
     * 1.更新调度记录为执行中
     * 2.invoke
     * 3.回写反馈
     */
    fun exec(scheduleLogId: Long?, params: Map<String, Any>) {
        ExecutorContext.getExecutorService().submit{

        }
    }
}