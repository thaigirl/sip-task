package com.sip.task.core.context

import com.sip.task.core.dto.StatusEnum
import com.sip.task.core.logger.TaskLogger
import com.sip.task.core.util.ParamUtils
import java.lang.reflect.Method
import java.lang.reflect.Parameter

class ExecutorInstance {

    private var execCode: String? = null
    private var beanInstance: Any? = null
    private var beanClass: Class<out Any>? = null
    private var method: Method? = null
    private var params: Array<Parameter>? = null

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
    fun exec(recordId:Long,inputParams: Map<String, Any>) {
        ExecutorContext.getExecutorService().submit {
            try {
                ExecutorContext.setCurrentTaskRecordId(recordId)
                FeignContext.feedBackTaskStatus(StatusEnum.RUNNING)
                if (this.params.isNullOrEmpty()){
                    method!!.invoke(beanInstance)
                }else{
                    val parameters = formatParameter(inputParams)
                    method!!.invoke(beanInstance, *parameters)
                }
                FeignContext.feedBackTaskStatus(StatusEnum.SUCCESS)
            }catch (var1: Exception){
                var1.printStackTrace()
                TaskLogger.getLogger(this.javaClass).error("an exception occurred during the task",var1)
                FeignContext.feedBackTaskStatus(StatusEnum.FAILED)
            }
        }
    }


    private fun formatParameter(inputParam: Map<String, Any>): Array<Any?> {
        if (this.params.isNullOrEmpty()) return emptyArray()
        val ret = arrayOfNulls<Any>(this.params!!.size)
        for (i in this.params!!.indices){
            val param = this.params!![i]
            val type = param.type
            ret[i] = ParamUtils.formateValue(type,inputParam[param.name])
        }
        return ret
    }


}
