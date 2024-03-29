package com.sip.task.admin.model.po

import java.io.Serializable
import javax.persistence.*

@Table(name = "QRTZ_TRIGGER_JOB")
class QrtzTriggerJob : Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    /**
     * 设置执行器主键ID
     *
     * @param executorId 执行器主键ID
     */
    @Column(name = "executor_id")
    var executorId: Long? = null
    var name: String? = null
    /**
     * 设置任务执行CRON
     *
     * @param cron 任务执行CRON
     */
    var cron: String? = null
    /**
     * @param desc
     */
    @Column(name = "`desc`")
    var desc: String? = null
    /**
     * 设置报警邮件,多个用逗号分隔
     *
     * @param alarmEmail 报警邮件,多个用逗号分隔
     */
    @Column(name = "alarm_email")
    var alarmEmail: String? = null
    /**
     * 设置执行器路由策略
     *
     * @param strategy 执行器路由策略
     */
    var strategy: String? = null
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
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    @Column(name = "create_time")
    var createTime: Long? = null
    /**
     * 设置创建人
     *
     * @param createUser 创建人
     */
    @Column(name = "create_user")
    var createUser: Long? = null
    /**
     * 设置更新时间
     *
     * @param updateTime 更新时间
     */
    @Column(name = "update_time")
    var updateTime: Long? = null
    /**
     * 设置更新人
     *
     * @param updateUser 更新人
     */
    @Column(name = "update_user")
    var updateUser: Long? = null

    /**
     * 状态（0否 1是）
     */
    var enable: Boolean? = null
    /**
     * 执行器任务编码
     */
    var code: String? = null
}
