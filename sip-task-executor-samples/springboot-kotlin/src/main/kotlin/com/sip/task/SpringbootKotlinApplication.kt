package com.sip.springbootkotlin

import com.sip.task.core.annotation.EnableSipTask
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@EnableSipTask
@EnableFeignClients
@SpringBootApplication
class SpringbootKotlinApplication

fun main(args: Array<String>) {
	runApplication<SpringbootKotlinApplication>(*args)
}
