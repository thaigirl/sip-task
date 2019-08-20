package com.sip.task.core.annotation

import java.lang.annotation.Documented
import java.lang.annotation.Inherited
import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy

/**
 * @author tianhu
 * @date 2019/7/24
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY_GETTER, AnnotationTarget.PROPERTY_SETTER)
@Documented
@Inherited
annotation class ScheduleTask(val code: String = "")
