package com.sip.task.admin.common.util

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


object PasswordUtil {
    private val bcryptPasswordEncoder = BCryptPasswordEncoder()
    fun matches(password: String, encodedPassword: String): Boolean {
        return bcryptPasswordEncoder.matches(password, encodedPassword)
    }

    fun encode(password: String): String {
        return bcryptPasswordEncoder.encode(password)
    }
}
