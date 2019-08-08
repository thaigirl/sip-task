package com.sip.task.admin.model.vo

import javax.validation.constraints.NotNull

class LoggerVo {
    @NotNull(message = "recordId不能为空")
    var recordId: Long? = null
    @NotNull(message = "内容不能为空")
    var msg: String? = null
}