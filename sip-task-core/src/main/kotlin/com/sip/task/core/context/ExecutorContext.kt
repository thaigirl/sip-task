package com.sip.task.core.context

import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class ExecutorContext {


    companion object {
        private val executors = ConcurrentHashMap<String,ExecutorInstance>()
        private val executorService= Executors.newCachedThreadPool()
        fun putExecutor(code: String, instance: ExecutorInstance) {
            executors[code] = instance
        }

        fun loadExecutor(name: String): ExecutorInstance? {
            return executors[name]
        }

        fun getExecutorService(): ExecutorService {
            return executorService
        }
    }
}