package com.sip.task.admin.model.po

import javax.persistence.*

@Table(name = "QRTZ_TRIGGER_JOB_PARAM")
class QrtzTriggerJobParam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    @Column(name = "job_id")
    var jobId: Long? = null
    var key: String? = null
    var type: String? = null
    var value: String? = null
}