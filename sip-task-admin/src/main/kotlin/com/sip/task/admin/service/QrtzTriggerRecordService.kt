package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.exception.CustomException
import com.basicfu.sip.core.service.BaseService
import com.github.pagehelper.PageInfo
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.mapper.QrtzTriggerJobMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordLogMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordMapper
import com.sip.task.admin.model.dto.QrtzTriggerRecordDto
import com.sip.task.admin.model.po.*
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

/**
 * @author tianhu
 * @date 2019/9/4
 */
@Service
class QrtzTriggerRecordService : BaseService<QrtzTriggerRecordMapper, QrtzTriggerRecord>() {

    @Autowired
    lateinit var executorMapper: QrtzTriggerExecutorMapper
    @Autowired
    lateinit var jobMapper: QrtzTriggerJobMapper
    @Autowired
    lateinit var logMapper: QrtzTriggerRecordLogMapper

    fun list(vo: QrtzTriggerRecordVo): PageInfo<QrtzTriggerRecordDto> {
        val page = selectPage<QrtzTriggerRecordDto>(example<QrtzTriggerRecord> {
            andEqualTo {
                executorId = vo.executorId
                jobId = jobId
            }
            andRightLike {
                code = vo.code
            }
            orderByDesc(QrtzTriggerRecord::createTime)
        })
        if (page.list.isNotEmpty()) {
            val jobIds = page.list.map { it.jobId }
            val executorIds = page.list.map { it.executorId }
            val jobMap = jobMapper.selectByIds(StringUtils.join(jobIds, ",")).associateBy({ it.id }, { it.name })
            val excutorMap = executorMapper.selectByIds(StringUtils.join(executorIds, ",")).associateBy({ it.id }, { it.name })
            page.list.forEach {
                it.jobName = jobMap[it.jobId]
                it.executorName = excutorMap[it.executorId]
            }
        }
        return page
    }

    fun getRecordLog(id: Long): Any {
        val logs = logMapper.selectByExample(example<QrtzTriggerRecordLog> {
            andEqualTo {
                recordId = id
            }
            orderByAsc(QrtzTriggerRecordLog::createTime)
        })
        val groupBy = logs.groupBy { it.type }
        val builder = StringBuilder()
        groupBy.forEach { (k, v) ->
            when (k) {
                BaseEnum.LogType.INVOKE.name -> {
                    v.forEach { builder.append(it).append("</br>") }
                }
                BaseEnum.LogType.EXECUTE.name -> {

                }
            }
        }
        return Any()
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    fun insert(job: QrtzTriggerJob, addressList: String):QrtzTriggerRecord {
        val now = System.currentTimeMillis()
        val record = QrtzTriggerRecord()
        BeanUtils.copyProperties(job, record)
        record.id = null
        record.jobId = job.id
        record.executorAddress = addressList
        record.status = BaseEnum.JobStatus.WAIT_EXEC.name
        record.startTime = now
        record.createTime = now
        record.createUser = 0
        mapper.insertSelective(record)
        return record
    }


    fun existRunningJob(jobId: Long): Boolean{
        return mapper.selectCountByExample(example<QrtzTriggerRecord> {
            andEqualTo {
                this.jobId = jobId
            }
            andIn(QrtzTriggerRecord::status, listOf(BaseEnum.JobStatus.RUNNING.name,BaseEnum.JobStatus.WAIT_EXEC.name))
        }) > 1
    }


    fun delete(id: Long): Int {
        val exist = mapper.selectByPrimaryKey(id)
        if (exist.status != BaseEnum.JobStatus.WAIT_EXEC.name) throw CustomException("status error")
        return mapper.deleteByPrimaryKey(id)
    }
}
