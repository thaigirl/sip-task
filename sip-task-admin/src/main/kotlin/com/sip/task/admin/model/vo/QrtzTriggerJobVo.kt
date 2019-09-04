package com.sip.task.admin.model.po

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

class QrtzTriggerJobVo {

    var id: Long? = null
    @NotNull(message = "执行器id不能为空")
    var executorId: Long? = null
    @NotBlank(message = "cron不能为空")
    var cron: String? = null
    @NotBlank(message = "名称不能为空")
    var name: String? = null
    var desc: String? = null
    var alarmEmail: String? = null
    @NotBlank(message = "执行策略不能为空")
    var strategy: String? = null
    @NotNull(message = "超时时间不能为空")
    var timeout: Int? = null
    var failRetryCount: Int? = null
    var createTime: Long? = null
    var createUser: Long? = null
    var updateTime: Long? = null
    var updateUser: Long? = null
    var enable: Boolean? = null
    var code: String? = null
    var param: List<QrtzTriggerJobParam>? = null
}
