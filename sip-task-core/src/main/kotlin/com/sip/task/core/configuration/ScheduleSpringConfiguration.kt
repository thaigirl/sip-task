package com.sip.task.core.configuration

import com.sip.task.core.annotation.ScheduleTask
import com.sip.task.core.context.ExecutorContext
import com.sip.task.core.context.ExecutorInstance
import org.springframework.aop.support.AopUtils
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.context.annotation.Configuration

@Configuration
class ScheduleSpringConfiguration:ApplicationContextAware {

    /**
     * 初始化所有包含@ScheduleTask注解的方法
     */
    override fun setApplicationContext(applicationContext: ApplicationContext) {
        val beans = applicationContext.getBeanNamesForType(Object::class.java)
        beans.forEach { it ->
            val bean = applicationContext.getBean(it)
            val clazz = bean.javaClass
            if (isProxy(bean)){
                //是否是代理对象
                //TODO do something
            }
            val methods = clazz.methods
            methods.forEach {mhd->
                if (mhd.isAnnotationPresent(ScheduleTask::class.java)){
                    val code = mhd.getAnnotation(ScheduleTask::class.java).code
                    val instance = ExecutorInstance(code,bean,clazz,mhd,mhd.parameters)
                    ExecutorContext.putExecutor(code,instance)
                }
            }

        }

    }


    private fun isProxy(beanInstance: Any): Boolean {
        return AopUtils.isCglibProxy(beanInstance) || AopUtils.isAopProxy(beanInstance) || AopUtils.isJdkDynamicProxy(beanInstance)
    }

}