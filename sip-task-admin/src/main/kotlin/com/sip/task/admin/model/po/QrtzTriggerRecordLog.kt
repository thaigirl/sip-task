package com.sip.task.admin.model.po

import javax.persistence.*

@Table(name = "QRTZ_TRIGGER_RECORD_LOG")
class QrtzTriggerRecordLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    @Column(name = "record_id")
    var recordId: Long? = null
    var type: String? = null
    var value: String? = null
    @Column(name = "create_time")
    var createTime: Long? = null

}