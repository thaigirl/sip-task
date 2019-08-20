package com.sip.task.core.annotation

import com.sip.task.core.configuration.BeanRegisterConfiguration
import com.sip.task.core.configuration.FeignRegistrar
import com.sip.task.core.configuration.ScheduleSpringConfiguration
import org.springframework.context.annotation.Import
import java.lang.annotation.Documented
import java.lang.annotation.Inherited
import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy

@Retention(RetentionPolicy.RUNTIME)
@Target(AnnotationTarget.CLASS, AnnotationTarget.FILE)
@Documented
@Inherited
@Import(BeanRegisterConfiguration::class, FeignRegistrar::class, ScheduleSpringConfiguration::class)
annotation class EnableSipTask
