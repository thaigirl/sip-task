package com.basicfu.sip.schedule.util

import cn.hutool.http.HttpRequest
import com.alibaba.fastjson.JSON
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
            if (instance.failRetryCount != null && index > instance.failRetryCount!!) {
                return jobInvokeResult
            }
            try {
                index++
                var url = ele.plus("/schedule/${instance.recordId}")
                log.info("发送http请求,地址:{},参数:{}", url, instance.param)
                var response = HttpRequest.post(url).body(JSON.toJSONString(instance.param)).execute()
                log.info("http请求响应,状态码:{},内容:{}", response.status, response.body())
                jobInvokeResult.log="请求地址:".plus(url).plus("<br/>")
                        .plus("响应码:").plus(response.status).plus("<br/>")
                        .plus("响应内容:").plus(response.body()).plus("<br/>")
                // 响应为空,重试
                if (response.body().isNullOrBlank()) {
                    return@forEach
                }
                if (response.status != 200) {
                    jobInvokeResult.status = response.status.toString()
                    jobInvokeResult.msg = response.body()
                    return@forEach
                }
                var resObj = JSON.parseObject(response.body())
                jobInvokeResult.status = resObj.getString("status")
                jobInvokeResult.msg = resObj.getString("msg")
                // status为fail,重试
                if (jobInvokeResult.status == "fail") {
                    return@forEach
                }
                return jobInvokeResult
            } catch (e: Exception) {
                log.info("http请求异常,重试下一个地址")
                jobInvokeResult.status = "-1"
                jobInvokeResult.msg = "http请求异常,重试下一个地址"
            }
        }
        return jobInvokeResult
    }

}
