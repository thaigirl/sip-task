package com.sip.task.admin

import com.basicfu.sip.core.annotation.EnableSipCore
import org.springframework.boot.runApplication
import org.springframework.cloud.client.SpringCloudApplication
import org.springframework.cloud.openfeign.EnableFeignClients
import tk.mybatis.spring.annotation.MapperScan

@MapperScan(basePackages = ["com.sip.task.admin.mapper"])
@EnableSipCore
@SpringCloudApplication
@EnableFeignClients
class AdminApplication

fun main(args: Array<String>) {
    runApplication<AdminApplication>(*args)
}
