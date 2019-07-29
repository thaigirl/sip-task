package com.sip.task.core.context

import java.lang.reflect.Method
import java.lang.reflect.Parameter

class ExecutorInstance {

    private var execCode: String? = null
    private var beanInstance: Any? = null
    private var beanClass: Class<out Any>? = null
    private var method: Method? = null
    private var params: Array<Parameter>? = null


    constructor()
    constructor(execCode: String, beanInstance: Any, beanClass: Class<out Any>, method: Method, params: Array<Parameter>) {
        this.execCode = execCode
        this.beanInstance = beanInstance
        this.beanClass = beanClass
        this.method = method
        this.params = params
    }

    /**
     * 1.更新调度记录为执行中
     * 2.invoke
     * 3.回写反馈
     */
    fun exec(scheduleLogId: Long?, params: Map<String, Any>) {
        ExecutorContext.getExecutorService().submit {

        }
    }


    private fun formatParameter(inputParam: Map<String, Any>): Array<Any?> {
        if (params.isNullOrEmpty()) return emptyArray()
        val ret = arrayOfNulls<Any>(params!!.size)
        for (i in 0 until params!!.size){
            val param = params!![i]
            ret[i] = inputParam[param.name]
        }
        return ret
    }


}