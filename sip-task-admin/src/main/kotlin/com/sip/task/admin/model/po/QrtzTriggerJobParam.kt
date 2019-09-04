package com.sip.task.admin.model.po

import javax.persistence.*

@Table(name = "QRTZ_TRIGGER_JOB_PARAM")
class QrtzTriggerJobParam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    @Column(name = "job_id")
    var jobId: Long? = null
    @Column(name = "`key`")
    var key: String? = null
    @Column(name = "`type`")
    var type: String? = null
    @Column(name = "`value`")
    var value: String? = null
}
