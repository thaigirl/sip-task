package com.sip.task.admin.model.vo

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

class FeedBackTaskStatusVo {
    @NotNull(message = "recordId不能为空")
    var recordId: Long? = null
    @NotBlank(message = "状态不能为空")
    var status: String? = null
}