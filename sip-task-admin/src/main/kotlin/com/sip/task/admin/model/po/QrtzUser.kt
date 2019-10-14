package com.sip.task.admin.model.po

import javax.persistence.*

@Table(name = "QRTZ_USER")
class QrtzUser {
    /**
     * 主键
     */
    /**
     * 获取主键
     *
     * @return id - 主键
     */
    /**
     * 设置主键
     *
     * @param id 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    /**
     * 姓名
     */
    /**
     * 获取姓名
     *
     * @return name - 姓名
     */
    /**
     * 设置姓名
     *
     * @param name 姓名
     */
    var name: String? = null

    /**
     * 昵称
     */
    /**
     * 获取昵称
     *
     * @return nickname - 昵称
     */
    /**
     * 设置昵称
     *
     * @param nickname 昵称
     */
    var nickname: String? = null

    /**
     * 密码
     */
    /**
     * 获取密码
     *
     * @return password - 密码
     */
    /**
     * 设置密码
     *
     * @param password 密码
     */
    var password: String? = null

    /**
     * 创建时间
     */
    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    @Column(name = "create_time")
    var createTime: Long? = null

    /**
     * 创建人
     */
    /**
     * 获取创建人
     *
     * @return create_user - 创建人
     */
    /**
     * 设置创建人
     *
     * @param createUser 创建人
     */
    @Column(name = "create_user")
    var createUser: Long? = null

    /**
     * 更新时间
     */
    /**
     * 获取更新时间
     *
     * @return update_time - 更新时间
     */
    /**
     * 设置更新时间
     *
     * @param updateTime 更新时间
     */
    @Column(name = "update_time")
    var updateTime: Long? = null

    /**
     * 更新人
     */
    /**
     * 获取更新人
     *
     * @return update_user - 更新人
     */
    /**
     * 设置更新人
     *
     * @param updateUser 更新人
     */
    @Column(name = "update_user")
    var updateUser: Long? = null
}