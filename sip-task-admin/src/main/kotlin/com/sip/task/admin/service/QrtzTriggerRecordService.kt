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
import com.sip.task.admin.model.po.QrtzTriggerRecord
import com.sip.task.admin.model.po.QrtzTriggerRecordDto
import com.sip.task.admin.model.po.QrtzTriggerRecordLog
import com.sip.task.admin.model.po.QrtzTriggerRecordVo
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

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
        if (page.list.isNotEmpty()){
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

    fun getRecordLog(id: Long):Any{
        val logs = logMapper.selectByExample(example<QrtzTriggerRecordLog> {
            andEqualTo {
                recordId = id
            }
            orderByAsc(QrtzTriggerRecordLog::createTime)
        })
        val groupBy = logs.groupBy { it.type }
        val builder = StringBuilder()
        groupBy.forEach { (k, v) ->
            when(k){
                BaseEnum.LogType.INVOKE.name->{
                    v.forEach { builder.append(it).append("</br>") }
                }
                BaseEnum.LogType.EXECUTE.name->{

                }
            }
        }
        return Any()
    }

    fun delete(id: Long):Int{
        val exist = mapper.selectByPrimaryKey(id)
        if (exist.status != BaseEnum.StatusEnum.WAIT_EXEC.name) throw CustomException("status error")
        return mapper.deleteByPrimaryKey(id)
    }
}
