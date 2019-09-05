package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.service.BaseService
import com.github.pagehelper.PageInfo
import com.sip.task.admin.common.cache.ExecutorCache
import com.sip.task.admin.mapper.QrtzTriggerExecutorMapper
import com.sip.task.admin.model.dto.QrtzTriggerExecutorDto
import com.sip.task.admin.model.po.QrtzTriggerExecutor
import com.sip.task.admin.model.vo.QrtzTriggerExecutorVo
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

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

    @PostConstruct
    fun init() {
        var list = mapper.selectAll()
        ExecutorCache.init(list)
    }

    fun list(vo: QrtzTriggerExecutorVo): PageInfo<QrtzTriggerExecutorDto> {
        return selectPage(example<QrtzTriggerExecutor> {
            andLike(QrtzTriggerExecutor::name, vo.name)
        })
    }

    fun all(): List<QrtzTriggerExecutorDto> {
        var list = mapper.selectAll()
        list.sortByDescending { it.createTime }
        return to(list)
    }

    fun insert(vo: QrtzTriggerExecutorVo): Int {
        val po = dealInsert(to<QrtzTriggerExecutor>(vo))
        val num=mapper.insertSelective(po)
        ExecutorCache.set(po!!.id!!,po!!)
        return num
    }

    fun update(vo: QrtzTriggerExecutorVo): Int {
        val po = dealUpdate(to<QrtzTriggerExecutor>(vo))
        val num=mapper.updateByPrimaryKeySelective(po)
        ExecutorCache.set(po!!.id!!,po!!)
        return num
    }

    fun delete(ids: List<Long>?): Int {
        ids?.forEach { ExecutorCache.remove(it) }
        return deleteByIds(ids)
    }

    fun get(id: Long): QrtzTriggerExecutor? {
        return mapper.selectByPrimaryKey(id)
    }

}
