package com.sip.task.core.configuration

import org.springframework.cloud.openfeign.EnableFeignClients

@EnableFeignClients(basePackages = ["com.sip.task.core.feign"])
class FeignRegistrar
