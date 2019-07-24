package com.sip.task.core.logger

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class TaskLogger : Logger {

    var slf4jLogger = LoggerFactory.getLogger(this.javaClass)
    override fun debug(var1: String) {
        slf4jLogger.debug(var1)
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun debug(var1: String, vararg var2: Any) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun info(var1: String) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun info(var1: String, vararg var2: Any) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun error(var1: String) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun error(var1: String, vararg var2: Any) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun error(var1: String, var2: Throwable) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun warn(var1: String) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun warn(var1: String, vararg var2: Any) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }


}