package com.sip.springbootkotlin

import com.sip.task.core.annotation.EnableSipTask
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@EnableSipTask
@SpringBootApplication
@ComponentScan("com.sip.sample")
class SpringbootKotlinApplication

fun main(args: Array<String>) {
	runApplication<SpringbootKotlinApplication>(*args)
}
