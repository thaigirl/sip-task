package com.sip.task.admin.common

enum class BaseEnum(val value: Int, val msg: String) {
    ILLEGAL_REQUEST(6, "非法请求"),
    LOGIN_TIMEOUT(5, "登录超时"),
    REPEAT_REQUEST(7, "重复请求"),
    WAITING(112, "操作频繁,请稍候");

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
