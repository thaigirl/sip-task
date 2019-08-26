package com.sip.task.admin.model.po

class QrtzTriggerJobVo {

    var id: Long? = null
    var executorId: Long? = null
    var cron: String? = null
    var name: String? = null
    var desc: String? = null
    var alarmEmail: String? = null
    var strategy: String? = null
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
