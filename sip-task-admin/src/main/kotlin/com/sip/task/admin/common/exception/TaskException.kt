package com.basicfu.sip.schedule.common.exception

/**
 * 计划策略异常
 *
 * @author ruoyi
 */
class TaskException @JvmOverloads constructor(msg: String, val code: Code, nestedEx: Exception? = null) : Exception(msg, nestedEx) {

    enum class Code {
        TASK_EXISTS, NO_TASK_EXISTS, TASK_ALREADY_STARTED, UNKNOWN, CONFIG_ERROR, TASK_NODE_NOT_AVAILABLE
    }

    companion object {
        private val serialVersionUID = 1L
    }
}