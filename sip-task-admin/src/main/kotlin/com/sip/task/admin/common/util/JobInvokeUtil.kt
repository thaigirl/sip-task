package com.basicfu.sip.schedule.util

import com.sip.task.admin.model.dto.ExecuteInstance
import com.sip.task.admin.model.po.QrtzTriggerJob
import org.apache.commons.lang3.StringUtils
import org.slf4j.LoggerFactory
import java.lang.reflect.InvocationTargetException

/**
 * 任务执行工具
 */
object JobInvokeUtil {

    private val log = LoggerFactory.getLogger(this.javaClass)
    /**
     * 执行方法
     *
     * @param job 系统任务
     */
    @Throws(Exception::class)
    fun invokeMethod(instance: ExecuteInstance) {
        log.info("执行job,url和code")
    }
}
