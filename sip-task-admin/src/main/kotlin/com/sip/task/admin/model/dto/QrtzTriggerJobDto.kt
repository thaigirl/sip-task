package com.sip.task.admin.model.po

class QrtzTriggerJobDto {

    var id: Long? = null
    /**
     * 设置执行器主键ID
     *
     * @param executorId 执行器主键ID
     */
    var executorId: Long? = null
    /**
     * 设置任务执行CRON
     *
     * @param cron 任务执行CRON
     */
    var cron: String? = null
    /**
     * @param desc
     */
    var desc: String? = null
    /**
     * 设置报警邮件,多个用逗号分隔
     *
     * @param alarmEmail 报警邮件,多个用逗号分隔
     */
    var alarmEmail: String? = null
    /**
     * 设置执行器路由策略
     *
     * @param strategy 执行器路由策略
     */
    var strategy: String? = null
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
    var failRetryCount: Int? = null
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
    /**
     * 状态（0正常 1暂停）
     */
    var status: String? = null
    /**
     * cron执行表达式
     */
    var cronExpression: String? = null

    /**
     * 计划执行错误策略（1立即执行 2执行一次 3放弃执行）
     */
    var misfirePolicy: String? = null

    /**
     * 是否并发执行（0允许 1禁止）
     */
    var concurrent: String? = null
}