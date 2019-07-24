package com.sip.task.core.logger

interface Logger {
    fun debug(var1: String)

    fun debug(var1: String, vararg var2: Any)

    fun info(var1: String)

    fun info(var1: String, vararg var2: Any)

    fun error(var1: String)

    fun error(var1: String, vararg var2: Any)

    fun error(var1: String, var2: Throwable)

    fun warn(var1: String)

    fun warn(var1: String, vararg var2: Any)
}