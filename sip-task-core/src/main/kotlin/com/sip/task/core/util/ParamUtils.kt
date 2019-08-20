package com.sip.task.core.util

import java.text.ParseException
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.*

/**
 * @author tianhu
 * @date 2019/7/29
 */
object ParamUtils {

    private val DATE_FORMATER = "yyyy-MM-dd HH:mm:ss"
    private val methodNameMap = mutableMapOf<Class<*>, String>()


    fun formateValue(paramType: Class<*>, value: Any?): Any? {
        if (value == null) return null
        val sdf = SimpleDateFormat(DATE_FORMATER)
        return when (paramType) {
            value::class.java -> value
            Date::class.java -> try {
                sdf.parse(value.toString())
            } catch (var1: ParseException) {
                throw RuntimeException(var1.message)
            }
            LocalDate::class.java -> try {
                LocalDate.parse(value.toString(), DateTimeFormatter.ofPattern(DATE_FORMATER))
            } catch (var2: DateTimeParseException) {
                throw RuntimeException(var2.message)
            }
            LocalDateTime::class.java -> try {
                LocalDateTime.parse(value.toString(), DateTimeFormatter.ofPattern(DATE_FORMATER))
            } catch (var3: DateTimeParseException) {
                throw RuntimeException(var3.message)
            }
            String::class.java -> value.toString()
            Long::class.java  -> try {
                value.toString().toLong()
            } catch (var4: Exception) {
                throw RuntimeException(var4.message)
            }
            Double::class.java  -> try {
                value.toString().toDouble()
            } catch (var5: Exception) {
                throw RuntimeException(var5.message)
            }
            Float::class.java  -> try {
                value.toString().toFloat()
            } catch (var6: Exception) {
                throw RuntimeException(var6.message)
            }
            Short::class.java  -> try {
                value.toString().toShort()
            } catch (var7: Exception) {
                throw RuntimeException(var7.message)
            }
            Int::class.java  -> try {
                value.toString().toInt()
            } catch (var8: Exception) {
                throw RuntimeException(var8.message)
            }
            else -> {
                throw RuntimeException("can not format with type:$paramType")
            }
        }
    }


    init {
        methodNameMap[Long::class.java] = "valueOf"
        methodNameMap[java.lang.Long.TYPE] = "valueOf"
        methodNameMap[Int::class.java] = "valueOf"
        methodNameMap[Integer.TYPE] = "valueOf"
        methodNameMap[Short::class.java] = "valueOf"
        methodNameMap[java.lang.Short.TYPE] = "valueOf"
        methodNameMap[Byte::class.java] = "valueOf"
        methodNameMap[java.lang.Byte.TYPE] = "valueOf"
        methodNameMap[Float::class.java] = "valueOf"
        methodNameMap[java.lang.Float.TYPE] = "valueOf"
        methodNameMap[Double::class.java] = "valueOf"
        methodNameMap[java.lang.Double.TYPE] = "valueOf"
        methodNameMap[String::class.java] = "valueOf"
    }




}
