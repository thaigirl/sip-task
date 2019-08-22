package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.service.BaseService
import com.github.pagehelper.PageInfo
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.model.dto.QrtzTriggerExecutorDto
import com.sip.task.admin.model.po.QrtzTriggerExecutor
import com.sip.task.admin.model.vo.QrtzTriggerExecutorVo
import org.springframework.stereotype.Service

/**
 * <p>
 * 定时任务调度日志表 服务实现类
 * </p>
 *
 * @author liyang
 * @since 2019-06-15
 */
@Service
class QrtzTriggerExecutorService : BaseService<QrtzTriggerExecutorMapper, QrtzTriggerExecutor>() {

    fun list(vo: QrtzTriggerExecutorVo): PageInfo<QrtzTriggerExecutorDto> {
        return selectPage(example<QrtzTriggerExecutor> {
            andLike(QrtzTriggerExecutor::name,vo.name)
        })
    }

    fun all(): List<QrtzTriggerExecutorDto> {
        return to(mapper.selectAll())
    }

    fun insert(vo: QrtzTriggerExecutorVo): Int {
        val po = dealInsert(to<QrtzTriggerExecutor>(vo))
        return mapper.insertSelective(po)
    }

    fun update(vo: QrtzTriggerExecutorVo): Int {
        val po = dealUpdate(to<QrtzTriggerExecutor>(vo))
        return mapper.updateByPrimaryKeySelective(po)
    }

    fun delete(ids: List<Long>?): Int {
        return deleteByIds(ids)
    }

    fun get(id: Long): QrtzTriggerExecutor? {
        return mapper.selectByPrimaryKey(id)
    }

}
