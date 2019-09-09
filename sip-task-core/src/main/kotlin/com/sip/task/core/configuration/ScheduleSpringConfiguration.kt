package com.sip.task.core.configuration

import com.alibaba.fastjson.JSON
import com.sip.task.core.annotation.ScheduleTask
import com.sip.task.core.context.ExecutorContext
import com.sip.task.core.context.ExecutorInstance
import org.springframework.aop.support.AopUtils
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.context.annotation.Configuration

@Configuration
class ScheduleSpringConfiguration : ApplicationContextAware {

    /**
     * 初始化所有包含@ScheduleTask注解的方法
     */
    override fun setApplicationContext(applicationContext: ApplicationContext) {
        val beans = applicationContext.getBeanNamesForType(Object::class.java)
        beans.forEach {
            val bean = applicationContext.getBean(it)
            var clazz = bean::class.java
            //是否是代理对象
            if (isProxy(bean)) {
                clazz = AopUtils.getTargetClass(bean)
            }
            val methods = clazz.methods
            methods.forEach { mhd ->
                if (mhd.isAnnotationPresent(ScheduleTask::class.java)) {
                    val code = mhd.getAnnotation(ScheduleTask::class.java).code
                    val instance = ExecutorInstance(code, bean, clazz, mhd, mhd.parameters)
                    print("发现实例:"+ JSON.toJSONString(instance))
                    ExecutorContext.putExecutor(code, instance)
                }
            }

        }

    }


    private fun isProxy(beanInstance: Any): Boolean {
        return AopUtils.isCglibProxy(beanInstance) || AopUtils.isAopProxy(beanInstance) || AopUtils.isJdkDynamicProxy(beanInstance)
    }

}
