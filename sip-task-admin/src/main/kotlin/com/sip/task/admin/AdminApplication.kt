package com.sip.task

import com.basicfu.sip.core.annotation.EnableSipCore
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.SpringCloudApplication
import tk.mybatis.spring.annotation.MapperScan

@MapperScan(basePackages = ["com.sip.task.admin.mapper"])
@EnableSipCore
@SpringCloudApplication
//@SpringBootApplication
class AdminApplication

fun main(args: Array<String>) {
    runApplication<AdminApplication>(*args)
}
