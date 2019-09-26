package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.exception.CustomException
import com.basicfu.sip.core.common.generate
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.common.cache.ExecutorCache
import com.sip.task.admin.common.util.JobInvokeUtil
import com.sip.task.admin.mapper.QrtzTriggerJobMapper
import com.sip.task.admin.mapper.QrtzTriggerJobParamMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordLogMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordMapper
import com.sip.task.admin.model.dto.JobInvokeResult
import com.sip.task.admin.model.po.QrtzTriggerJob
import com.sip.task.admin.model.po.QrtzTriggerJobParam
import com.sip.task.admin.model.po.QrtzTriggerRecord
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * @author tianhu
 * @date 2019/9/6
 */
@Service
class JobInvokeService{

    @Autowired
    lateinit var paramMapper: QrtzTriggerJobParamMapper
    @Autowired
    lateinit var recordService: QrtzTriggerRecordService
    @Autowired
    lateinit var jobMapper: QrtzTriggerJobMapper
    @Autowired
    lateinit var recordMapper: QrtzTriggerRecordMapper
    @Autowired
    lateinit var recordLogMapper: QrtzTriggerRecordLogMapper

    @Transactional
    fun trigger(job: QrtzTriggerJob){
        val executor = ExecutorCache.get(job.executorId!!)
        //新增record,需要新起一个事物,确保发起http请求前记录已经入库
        val record = recordService.insert(job, executor.addressList!!)
        val paramMap = paramMapper.selectByExample(example<QrtzTriggerJobParam> {
            andEqualTo {
                jobId = job.id
            }
        }).associateBy({it.key!!},{it.value!!}).toMutableMap()
        paramMap["code"] = job.code!!
        //如果运行策略是阻塞且有未完成的任务则不发起调度
        if (job.strategy == BaseEnum.Strategy.BLOCKING.name && recordService.existRunningJob(job.id!!)) return
        val invokeResult = JobInvokeUtil.invokeMethod(generate {
            address = executor.addressList?.split("，")
            this.recordId = record.id
            param = paramMap
            failRetryCount = job.failRetryCount
        })
        dealResponse(record,invokeResult)

    }

    fun trigger(record: QrtzTriggerRecord){
        val job = jobMapper.selectByPrimaryKey(record.jobId) ?:throw CustomException("job not found with id:${record
                .jobId}")
        val executor = ExecutorCache.get(job.executorId!!)
        val paramMap = paramMapper.selectByExample(example<QrtzTriggerJobParam> {
            andEqualTo {
                jobId = job.id
            }
        }).associateBy({it.key!!},{it.value!!}).toMutableMap()
        paramMap["code"] = job.code!!
        val invokeResult = JobInvokeUtil.invokeMethod(generate {
            address = executor.addressList?.split("，")
            this.recordId = recordId
            param = paramMap
            failRetryCount = job.failRetryCount
        })
        dealResponse(record,invokeResult)
    }


    fun dealResponse(record:QrtzTriggerRecord,result:JobInvokeResult){
        if (result.status == "fail"){
            record.status = BaseEnum.JobStatus.FAILED.name
            record.endTime = System.currentTimeMillis()
            recordMapper.updateByPrimaryKeySelective(record)
            //TODO 这里是否需要去调度下一个job?
        }
        recordLogMapper.insertSelective(generate {
            recordId = record.id
            type = BaseEnum.LogType.INVOKE.name
            value = result.log
            createTime = System.currentTimeMillis()
        })
    }
}
