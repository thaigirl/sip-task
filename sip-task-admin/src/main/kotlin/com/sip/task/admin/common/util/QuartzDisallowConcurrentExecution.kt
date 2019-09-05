package com.basicfu.sip.schedule.util

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.generate
import com.sip.task.admin.common.cache.ExecutorCache
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.mapper.QrtzTriggerJobParamMapper
import com.sip.task.admin.model.dto.ExecuteInstance
import com.sip.task.admin.model.po.QrtzTriggerJob
import com.sip.task.admin.model.po.QrtzTriggerJobParam
import org.quartz.DisallowConcurrentExecution
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * 定时任务处理（禁止并发执行）
 */

@Component
@DisallowConcurrentExecution
class QuartzDisallowConcurrentExecution : AbstractQuartzJob() {

    @Autowired
    lateinit var executorMapper: QrtzTriggerExecutorMapper
    @Autowired
    lateinit var paramMapper: QrtzTriggerJobParamMapper

    @Throws(Exception::class)
    override fun doExecute(recordId:Long,job: QrtzTriggerJob) {
        val executor = ExecutorCache.get(job.executorId!!)
        val paramMap = paramMapper.selectByExample(example<QrtzTriggerJobParam> {
            andEqualTo {
                jobId = job.id
            }
        }).associateBy({it.key!!},{it.value!!})
        val invokeResult = JobInvokeUtil.invokeMethod(generate {
            address = executor.addressList?.split(",")
            this.recordId = recordId
            param = paramMap
            failRetryCount = job.failRetryCount
        })
    }

}

