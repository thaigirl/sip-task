package com.sip.task.admin.model.dto

/**
 * @author tianhu
 * @date 2019/8/14
 */
class ExecuteInstance {

    var address: List<String>? = null
    var recordId: Long? = null
    var param: Map<String, String>? = null
    var failRetryCount: Int? = null
}
