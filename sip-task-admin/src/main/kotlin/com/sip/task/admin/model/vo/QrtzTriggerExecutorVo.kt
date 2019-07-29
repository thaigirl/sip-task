package com.sip.task.admin.model.vo

class QrtzTriggerExecutorVo {

    var id: Long? = null

    /**
     * 设置执行器名称
     *
     * @param name 执行器名称
     */
    var name: String? = null

    /**
     * 设置描述
     *
     * @param desc 描述
     */
    var desc: String? = null

    /**
     * 设置排序
     *
     * @param order 排序
     */
    var order: Byte? = null

    /**
     * 设置执行器地址列表，多地址逗号分隔
     *
     * @param addressList 执行器地址列表，多地址逗号分隔
     */
    var addressList: String? = null

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