package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.generate
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.mapper.QrtzTriggerJobMapper
import com.sip.task.admin.mapper.QrtzTriggerRecordMapper
import com.sip.task.admin.model.dto.IndexDto
import com.sip.task.admin.model.dto.IndexJobDto
import com.sip.task.admin.model.dto.IndexRecordDto
import com.sip.task.admin.model.dto.LineChartDto
import com.sip.task.admin.model.po.QrtzTriggerExecutor
import com.sip.task.admin.model.po.QrtzTriggerJob
import com.sip.task.admin.model.po.QrtzTriggerRecord
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class IndexService {

    @Autowired
    lateinit var jobMapper: QrtzTriggerJobMapper

    @Autowired
    lateinit var recordMapper: QrtzTriggerRecordMapper

    @Autowired
    lateinit var executorMapper: QrtzTriggerExecutorMapper

    fun index(): Any {
        val jobEnableCount = jobMapper.selectCountByExample(example<QrtzTriggerJob> {
            andEqualTo { enable = true }
        })
        val jobDisableCount = jobMapper.selectCountByExample(example<QrtzTriggerJob> {
            andEqualTo { enable = false }
        })
        val waitExec = recordMapper.selectCountByExample(example<QrtzTriggerRecord> {
            andEqualTo { status = BaseEnum.JobStatus.WAIT_EXEC.name }
        })
        val success = recordMapper.selectCountByExample(example<QrtzTriggerRecord> {
            andEqualTo { status = BaseEnum.JobStatus.SUCCESS.name }
        })
        val fail = recordMapper.selectCountByExample(example<QrtzTriggerRecord> {
            andEqualTo { status = BaseEnum.JobStatus.FAILED.name }
        })
        val running = recordMapper.selectCountByExample(example<QrtzTriggerRecord> {
            andEqualTo { status = BaseEnum.JobStatus.RUNNING.name }
        })
        val timeOut = recordMapper.selectCountByExample(example<QrtzTriggerRecord> {
            andEqualTo { status = BaseEnum.JobStatus.TIMEOUT.name }
        })
        val executorCount = executorMapper.selectCountByExample(example<QrtzTriggerExecutor> {
            select(QrtzTriggerExecutor::id)
        })
        return generate<IndexDto> {
            jobInfo = generate<IndexJobDto> {
                totalCount = jobEnableCount + jobDisableCount
                enableCount = jobEnableCount
                disableCount = jobDisableCount
            }
            recordInfo = generate<IndexRecordDto> {
                totalCount = waitExec + success + fail + running + timeOut
                waitExecCount = waitExec
                successCount = success
                failCount = fail
                runingCount = running
                timeOutCount = timeOut
            }
            this.executorCount = executorCount
        }
    }


    fun triggerInfo(startTime: Long?, endTime: Long?):Any {
        val now = Date()
        val start = startTime ?: addDays(now, -7)
        val end = endTime ?: now.time
        //TODO 数据量大这里就不合理了
        val list = recordMapper.selectByExample(example<QrtzTriggerRecord> {
            select(QrtzTriggerRecord::id, QrtzTriggerRecord::startTime)
            andNotEqualTo { status = BaseEnum.JobStatus.WAIT_EXEC.name }
            andBetween(QrtzTriggerRecord::startTime, start, end)
        })
        val groupBy = list.groupBy { timeStampToString(it.startTime!!) }
        val dtos = mutableListOf<LineChartDto>()
        groupBy.forEach { (k, v) ->
            dtos.add(generate {
                month=k
                acc=v.size
            })
        }
        return dtos
    }


    fun addDays(now: Date, days: Int): Long {
        val gregorianCalendar = GregorianCalendar()
        gregorianCalendar.time = now
        gregorianCalendar.add(Calendar.DATE, days)
        return gregorianCalendar.time.time
    }

    fun timeStampToString(date: Long): String {
        val format = SimpleDateFormat("yyyy-MM-dd")
        return format.format(Date((date)))
    }

}
