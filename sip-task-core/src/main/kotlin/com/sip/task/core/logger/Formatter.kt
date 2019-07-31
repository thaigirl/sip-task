package com.sip.task.core.logger

import org.slf4j.helpers.MessageFormatter
import java.text.SimpleDateFormat
import java.util.*

/**
 * @author tianhu
 * @date 2019/7/31
 */
object Formatter {
    val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

    fun formatLog(message: String, level: String, clazz: String, time: Date): String {
        return dateFormat.format(time) + "   " + level + "   " + clazz + "   " + message
    }

    fun array(format: String, vararg arguments: Any): String {
        return MessageFormatter.arrayFormat(format, arguments).message
    }

    fun currentTime(): String {
        return dateFormat.format(Date())
    }
}