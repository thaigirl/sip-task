package com.sip.task.core.configuration

import com.sip.task.core.context.FeignContext
import com.sip.task.core.controller.TriggerController
import com.sip.task.core.logger.TaskLogger
import org.springframework.beans.factory.support.BeanDefinitionBuilder
import org.springframework.beans.factory.support.BeanDefinitionRegistry
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar
import org.springframework.core.type.AnnotationMetadata

class BeanRegisterConfiguration: ImportBeanDefinitionRegistrar {


    override fun registerBeanDefinitions(importingClassMetadata: AnnotationMetadata, registry: BeanDefinitionRegistry) {
        val tl = BeanDefinitionBuilder.genericBeanDefinition(TaskLogger::class.java)
        val fc = BeanDefinitionBuilder.genericBeanDefinition(FeignContext::class.java)
        val trg = BeanDefinitionBuilder.genericBeanDefinition(TriggerController::class.java)
        registry.registerBeanDefinition(TaskLogger::class.java.simpleName, tl.beanDefinition)
        registry.registerBeanDefinition(FeignContext::class.java.simpleName, fc.beanDefinition)
        registry.registerBeanDefinition(TriggerController::class.java.simpleName, trg.beanDefinition)
    }
}
