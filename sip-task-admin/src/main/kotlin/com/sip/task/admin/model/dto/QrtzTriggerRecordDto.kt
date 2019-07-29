package com.sip.task.admin.model.po

import javax.persistence.Column

class QrtzTriggerRecordDto {
    /**
     * @param id
     */
    var id: Int? = null
    /**
     * 设置执行器主键ID
     *
     * @param executorId 执行器主键ID
     */
    var executorId: Long? = null
    /**
     * 设置任务，主键ID
     *
     * @param jobId 任务，主键ID
     */
    var jobId: Int? = null
    /**
     * 设置执行器地址，本次执行的地址
     *
     * @param executorAddress 执行器地址，本次执行的地址
     */
    var executorAddress: String? = null
    /**
     * 设置执行器任务编码
     *
     * @param code 执行器任务编码
     */
    var execCode: String? = null
    /**
     * 设置任务执行超时时间，单位秒
     *
     * @param timeout 任务执行超时时间，单位秒
     */
    var timeout: Int? = null
    /**
     * 设置失败重试次数
     *
     * @param failRetryCount 失败重试次数
     */
    @Column(name = "fail_retry_count")
    var failRetryCount: Int? = null
    /**
     * 设置调度执行开始时间
     *
     * @param startTime 调度执行开始时间
     */
    var startTime: Long? = null
    /**
     * 设置调度执行结束时间
     *
     * @param endTime 调度执行结束时间
     */
    var endTime: Long? = null
    /**
     * 设置执行状态, WAIT_EXEC-待执行,SUCCESS-执行成功,FAIL-执行失败
     *
     * @param status 执行状态, WAIT_EXEC-待执行,SUCCESS-执行成功,FAIL-执行失败
     */
    var status: String? = null
    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    var createTime: Long? = null
    /**
     * 设置创建人
     *
     * @param createUser 创建人
     */
    var createUser: Long? = null
    /**
     * 设置更新时间
     *
     * @param updateTime 更新时间
     */
    var updateTime: Long? = null
    /**
     * 设置更新人
     *
     * @param updateUser 更新人
     */
    var updateUser: Long? = null
}