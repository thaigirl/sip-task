package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.exception.CustomException
import com.basicfu.sip.core.util.RedisUtil
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.common.constants.Config
import com.sip.task.admin.mapper.QrtzTriggerRecordLogMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordMapper
import com.sip.task.admin.model.po.QrtzTriggerRecord
import com.sip.task.admin.model.vo.FeedBackTaskStatusVo
import com.sip.task.admin.model.vo.LoggerVo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class FeedBackService {

    @Autowired
    lateinit var recordLogMapper: QrtzTriggerRecordLogMapper

    @Autowired
    lateinit var recordMapper: QrtzTriggerRecordMapper

    @Autowired
    lateinit var jobInvokeService: JobInvokeService


    /**
     * 如果状态为
     */
    fun updateRecordStatus(vo: FeedBackTaskStatusVo){
        val exist = recordMapper.selectByPrimaryKey(vo.recordId)?:throw CustomException("record not found with id:${vo.recordId}")
        exist.status = vo.status
        recordMapper.updateByPrimaryKeySelective(exist)
        if (vo.status == BaseEnum.JobStatus.RUNNING.name) return
        //如果状态不等于RUNNING(等于SUCCESS或者FAILED),则本次任务结束,需要根据任务的执行策略进一步判断
        if (exist.strategy == BaseEnum.Strategy.BLOCKING.name){
            val waitList = recordMapper.selectByExample(example<QrtzTriggerRecord> {
                andEqualTo {
                    jobId = exist.jobId
                    status = BaseEnum.JobStatus.WAIT_EXEC.name
                }
                orderByAsc(QrtzTriggerRecord::startTime)
            })
            if (waitList.isEmpty())return
            val one = waitList[0]
            //TODO 发起调度请求
            jobInvokeService.trigger(one)
        }

    }


    /**
     *
     */
    fun insertLogger(vo: LoggerVo){
        RedisUtil.rpush(Config.LOG_KEY,vo)
    }

}
