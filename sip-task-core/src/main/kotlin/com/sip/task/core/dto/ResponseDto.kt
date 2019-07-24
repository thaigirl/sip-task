package com.sip.task.core.dto

class ResponseDto {
    var status: String? = null
    var msg: String? = null
    var data:Any?=null


    companion object {
        fun success(msg: String? = "",data:Any?=null): ResponseDto {
            val dto = ResponseDto()
            dto.status = "success"
            dto.msg = msg
            return dto
        }

        fun fail(msg: String? = "",data:Any?=null): ResponseDto {
            val dto = ResponseDto()
            dto.status = "fail"
            dto.msg = msg
            return dto
        }
    }
}