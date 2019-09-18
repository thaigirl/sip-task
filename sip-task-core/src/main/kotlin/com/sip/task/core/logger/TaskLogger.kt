package com.sip.task.core.logger

import com.sip.task.core.context.ExecutorContext
import com.sip.task.core.dto.LogLevel
import com.sip.task.core.feign.TaskFeignClient
import org.apache.commons.lang.exception.ExceptionUtils
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*
import javax.annotation.PostConstruct

@Component
class TaskLogger {

    @Autowired
    private lateinit var taskClient: TaskFeignClient

    @PostConstruct
    fun init() {
        client = taskClient
    }

    companion object {
        private var slf4jLogger: org.slf4j.Logger? = null
        private lateinit var client: TaskFeignClient

        fun getLogger(clazz: Class<Any>): Logger {
            if (slf4jLogger == null) {
                slf4jLogger = LoggerFactory.getLogger(clazz)
            }
            return Logger()
        }

        class Logger {
            fun debug(var1: String) {
                slf4jLogger!!.debug(var1)
                writeLog(LogLevel.DEBUG, var1)
            }

            fun debug(var1: String, vararg var2: Any) {
                slf4jLogger!!.debug(var1, var2)
                val log = Formatter.array(var1, var2)
                writeLog(LogLevel.DEBUG, log)

            }

            fun info(var1: String) {
                slf4jLogger!!.info(var1)
                writeLog(LogLevel.INFO, var1)
            }

            fun info(var1: String, vararg var2: Any) {
                slf4jLogger!!.info(var1, var2)
                val log = Formatter.array(var1, var2)
                writeLog(LogLevel.INFO, log)
            }

            fun error(var1: String) {
                slf4jLogger!!.error(var1)
                writeLog(LogLevel.ERROR, var1)
            }

            fun error(var1: String, vararg var2: Any) {
                slf4jLogger!!.error(var1, var2)
                val log = Formatter.array(var1, var2)
                writeLog(LogLevel.ERROR, log)
            }

            fun error(var1: String, var2: Throwable) {
                slf4jLogger!!.error(var1, var2)
                writeLog(LogLevel.ERROR, var1 + " " + ExceptionUtils.getStackTrace(var2))
            }

            fun warn(var1: String) {
                slf4jLogger!!.warn(var1)
                writeLog(LogLevel.WARN, var1)
            }

            fun warn(var1: String, vararg var2: Any) {
                slf4jLogger!!.warn(var1, var2)
                val log = Formatter.array(var1, var2)
                writeLog(LogLevel.WARN, log)
            }


            fun writeLog(level: LogLevel, msg: String) {
                val log = Formatter.formatLog(msg, level.name, slf4jLogger!!.name, Date())
                client.logger(ExecutorContext.getCurrentTaskRecordId(), log)
            }
        }
    }


}
