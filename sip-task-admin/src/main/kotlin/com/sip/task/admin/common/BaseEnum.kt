package com.sip.task.admin.common

enum class BaseEnum {
    ;

    enum class JobStatus {
        WAIT_EXEC,
        RUNNING,
        SUCCESS,
        FAILED,
        TIMEOUT;
    }

    enum class Strategy {
        BLOCKING,
        CONCURRENT
    }

    enum class ParamType {
        STRING,
        NUMBER,
        DATE
    }

    enum class LogType {
        INVOKE,
        EXECUTE
    }

}
