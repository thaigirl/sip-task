package com.sip.task.admin.common

enum class BaseEnum {
    ;
    enum class StatusEnum {
        WAIT_EXEC,
        RUNNING,
        SUCCESS,
        FAILED;
    }
    enum class Strategy {
        BLOCKING,
        CONCURRENT
    }
}