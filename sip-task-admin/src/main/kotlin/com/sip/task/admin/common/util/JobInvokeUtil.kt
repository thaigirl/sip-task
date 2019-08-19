package com.basicfu.sip.schedule.util

import com.alibaba.fastjson.JSON
import com.basicfu.sip.core.util.HttpUtil
import com.sip.task.admin.model.dto.ExecuteInstance
import com.sip.task.admin.model.dto.JobInvokeResult
import org.slf4j.LoggerFactory

/**
 * 任务执行工具
 */
object JobInvokeUtil {

    private val log = LoggerFactory.getLogger(this.javaClass)
    /**
     * 执行方法
     * 返回的JobInvokeResult是 最后一次重试 的结果
     * @param job 系统任务
     */
    @Throws(Exception::class)
    fun invokeMethod(instance: ExecuteInstance): JobInvokeResult {
        log.info("执行job")
        var jobInvokeResult = JobInvokeResult()
        // 遍历instance的address,code不等于200或者响应的status字段不等于success,则重试下一个地址
        var index = 0
        instance.address?.forEach { ele ->
            // 超过重试次数,终止重试
            if (instance.failRetryCount != null && index > instance.failRetryCount) {
                return jobInvokeResult
            }
            try {
                index++
                log.info("发送http请求,地址:{},参数:{}", ele, instance.param)
                val result = HttpUtil.post(ele, instance.param)
                log.info("发送http请求,响应为:{}", result)
                // 响应为空,重试
                if (result.isNullOrBlank()) {
                    return@forEach
                }
                var resObj = JSON.parseObject(result)
                jobInvokeResult.status = resObj.getString("status")
                jobInvokeResult.msg = resObj.getString("msg")
                jobInvokeResult.code = resObj.getString("code")
                // status为fail,重试
                if (jobInvokeResult.status == "fail") {
                    return@forEach
                }
            } catch (e: Exception) {
                log.info("http请求异常,重试下一个地址")
            }

        }
        return jobInvokeResult
    }
}
