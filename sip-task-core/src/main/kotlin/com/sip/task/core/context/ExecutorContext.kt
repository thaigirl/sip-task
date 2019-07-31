package com.sip.task.core.context

import java.lang.RuntimeException
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class ExecutorContext {


    companion object {
        private val executors = ConcurrentHashMap<String,ExecutorInstance>()
        private val executorService= Executors.newCachedThreadPool()
        private val currentTask = ThreadLocal<Long>()
        fun putExecutor(code: String, instance: ExecutorInstance) {
            executors[code] = instance
        }

        fun loadExecutor(code: String): ExecutorInstance? {
            return executors[code]
        }

        fun getExecutorService(): ExecutorService {
            return executorService
        }

        fun setCurrentTaskRecordId(recordId:Long){
            currentTask.set(recordId)
        }

        fun getCurrentTaskRecordId():Long{
            val recordId = currentTask.get()?:throw RuntimeException("recordId can not be null")
            return recordId
        }
    }
}