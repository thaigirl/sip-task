package com.sip.task.admin.common.constants

class Config {
    companion object {
        val LOG_KEY = "SIP_TASK_RECORD_LOG"
        val AUTHORIZATION = "Authorization"
        val EXPIRE_TIME = 1000 * 60 * 60 * 24L
        var REPEAT_URLS: String? = null
        val LOG_THRESHOLD = 10
        val LOG_DOING = "LOG_DOING"
    }
}
