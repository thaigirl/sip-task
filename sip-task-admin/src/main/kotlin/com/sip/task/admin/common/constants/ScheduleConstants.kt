package com.basicfu.sip.schedule.common.constants

/**
 * 任务调度通用常量
 *
 * @author ruoyi
 */
object ScheduleConstants {
    /**
     * 通用成功标识
     */
    val SUCCESS: String
        get() = "0"

    /**
     * 通用失败标识
     */
    val FAIL: String
        get() = "1"

    enum class Status constructor(val value: String) {
        /**
         * 正常
         */
        NORMAL("0"),
        /**
         * 暂停
         */
        PAUSE("1")
    }

    val TASK_CLASS_NAME = "TASK_CLASS_NAME"

    /**
     * 执行目标key
     */
    val TASK_PROPERTIES = "TASK_PROPERTIES"

    /**
     * 默认
     */
    val MISFIRE_DEFAULT = "0"

    /**
     * 立即触发执行
     */
    val MISFIRE_IGNORE_MISFIRES = "1"

    /**
     * 触发一次执行
     */
    val MISFIRE_FIRE_AND_PROCEED = "2"

    /**
     * 不触发立即执行
     */
    val MISFIRE_DO_NOTHING = "3"
}
