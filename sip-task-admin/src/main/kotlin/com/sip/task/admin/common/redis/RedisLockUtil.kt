package com.sip.task.admin.common.redis

import com.google.common.base.Strings
import com.sip.task.admin.common.constants.Config
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.TimeUnit

@Component
class RedisLockUtil {

    @Autowired
    lateinit var stringRedisTemplate: StringRedisTemplate


    fun checkSkipUri(uri: String): Boolean {
        if (Strings.isNullOrEmpty(Config.REPEAT_URLS)) return false
        val skipURI = Config.REPEAT_URLS!!.split(",".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        for (tmp in skipURI) {
            if (uri.endsWith(tmp)) {
                return true
            }
        }
        return false
    }

    fun checkRepeatOperation(uniqueKey: String, operation: String): Boolean {
        val key = "RepeatRequest$uniqueKey"
        val now = Date()
        val redisKey = key + operation
        val isExist = stringRedisTemplate.opsForValue().get(redisKey)
        return if (Strings.isNullOrEmpty(isExist)) {
            stringRedisTemplate.opsForValue().set(key + operation, now.time.toString(), 20, TimeUnit.SECONDS)
            false
        } else {
            true
        }
    }

    fun expireValue(uniqueKey: String, operation: String) {
        val key = "RepeatRequest$uniqueKey"
        stringRedisTemplate.boundValueOps(key + operation).expire(0, TimeUnit.SECONDS)
    }
}
