package com.sip.task.admin.service

import com.alibaba.fastjson.JSON
import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.exception.CustomException
import com.basicfu.sip.core.common.generate
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.common.constants.Config
import com.sip.task.admin.mapper.QrtzTriggerRecordLogMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordMapper
import com.sip.task.admin.model.po.QrtzTriggerRecord
import com.sip.task.admin.model.po.QrtzTriggerRecordLog
import com.sip.task.admin.model.vo.FeedBackTaskStatusVo
import com.sip.task.admin.model.vo.LoggerVo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Service
import java.lang.Exception
import java.util.concurrent.TimeUnit

@Service
class FeedBackService {


    @Autowired
    lateinit var recordMapper: QrtzTriggerRecordMapper

    @Autowired
    lateinit var jobInvokeService: JobInvokeService

    @Autowired
    lateinit var redisTemplate: RedisTemplate<String, Any>

    @Autowired
    lateinit var logMapper: QrtzTriggerRecordLogMapper


    /**
     * 如果状态为
     */
    fun updateRecordStatus(vo: FeedBackTaskStatusVo) {
        val exist = recordMapper.selectByPrimaryKey(vo.recordId)
                ?: throw CustomException("record not found with id:${vo.recordId}")
        exist.status = vo.status
        recordMapper.updateByPrimaryKeySelective(exist)
        if (vo.status == BaseEnum.JobStatus.RUNNING.name) return
        //如果状态不等于RUNNING(等于SUCCESS或者FAILED),则本次任务结束,需要根据任务的执行策略进一步判断
        if (exist.strategy == BaseEnum.Strategy.BLOCKING.name) {
            val waitList = recordMapper.selectByExample(example<QrtzTriggerRecord> {
                andEqualTo {
                    jobId = exist.jobId
                    status = BaseEnum.JobStatus.WAIT_EXEC.name
                }
                orderByAsc(QrtzTriggerRecord::startTime)
            })
            if (waitList.isEmpty()) return
            val one = waitList[0]
            //TODO 发起调度请求
            jobInvokeService.trigger(one)
        }

    }


    /**
     *
     */
    fun insertLogger(vo: LoggerVo) {
        val num = redisTemplate.opsForList().rightPush(Config.LOG_KEY, JSON.toJSONString(vo))
        if (num != null && num >= Config.LOG_THRESHOLD) {
            handleLog()
        }
    }


    fun handleLog() {
        val numer = redisTemplate.opsForValue().increment(Config.LOG_DOING, 1)!!
        //说明已经有任务在处理了
        if (numer > 1) return
        //设置过期时间，防止服务异常终止key未释放
        redisTemplate.expire(Config.LOG_DOING, 30, TimeUnit.SECONDS)
        try {
            val size = redisTemplate.opsForList().size(Config.LOG_KEY) ?: return
            if (size == 0L) {
                print("empty data")
                return
            }
            //处理日志
            val range = redisTemplate.opsForList().range(Config.LOG_KEY, 0, size - 1)
            if (range.isNullOrEmpty()) return
            val list = mutableListOf<QrtzTriggerRecordLog>()
            val now = System.currentTimeMillis()
            range.forEach {
                val vo = JSON.parseObject(it.toString(), LoggerVo::class.java)
                list.add(generate {
                    recordId = vo.recordId
                    type = BaseEnum.LogType.EXECUTE.name
                    value = vo.msg
                    createTime = now
                })
            }
            //TODO 批处理
            logMapper.insertList(list)
            redisTemplate.opsForList().trim(Config.LOG_KEY, size, -1)
        }catch (e:Exception){
            //TODO
        }
        redisTemplate.delete(Config.LOG_DOING)

    }

}
