package com.sip.task.admin.common.cache

import com.basicfu.sip.core.common.exception.CustomException
import com.sip.task.admin.model.po.QrtzTriggerExecutor

/**
 * @author tianhu
 * @date 2019/9/5
 */
object ExecutorCache {

    private var EXECUTOR: MutableMap<Long, QrtzTriggerExecutor> = mutableMapOf()


    fun set(id: Long, executor: QrtzTriggerExecutor) {
        EXECUTOR[id] = executor
    }

    fun get(id: Long): QrtzTriggerExecutor {
        return EXECUTOR[id] ?: throw CustomException("not found cache with id:$id")
    }

}
