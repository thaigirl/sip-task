package com.sip.task.core.dto

class ResponseDto {
    var status: String? = null
    var msg: String? = null


    companion object {
        fun success(msg: String? = ""): ResponseDto {
            val dto = ResponseDto()
            dto.status = "success"
            dto.msg = msg
            return dto
        }

        fun fail(msg: String? = ""): ResponseDto {
            val dto = ResponseDto()
            dto.status = "fail"
            dto.msg = msg
            return dto
        }
    }
}