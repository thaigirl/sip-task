package com.sip.task.core.logger

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class TaskLogger {

    companion object{
        var slf4jLogger = LoggerFactory.getLogger(this.javaClass)
        fun debug(var1: String) {
            slf4jLogger.debug(var1)
        }

        fun debug(var1: String, vararg var2: Any) {
        }

        fun info(var1: String) {
        }

        fun info(var1: String, vararg var2: Any) {
        }

        fun error(var1: String) {
        }

        fun error(var1: String, vararg var2: Any) {
        }

        fun error(var1: String, var2: Throwable) {
        }

        fun warn(var1: String) {
        }

        fun warn(var1: String, vararg var2: Any) {
        }
    }


}