package com.sip.task.admin.common.redis

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Component
import java.util.concurrent.TimeUnit
import javax.annotation.PostConstruct

@Component
class RedisUtil {
    @Autowired
    private lateinit var redisTemplateTmp: RedisTemplate<Any, Any>

    @PostConstruct
    fun init() {
        redisTemplate = redisTemplateTmp
    }

    companion object {
        private val timeUnit = TimeUnit.MILLISECONDS
        lateinit var redisTemplate: RedisTemplate<Any, Any>

        fun init(redisTemplate: RedisTemplate<Any, Any>) {
            Companion.redisTemplate = redisTemplate
        }



//        inline fun <reified T> get(k: Any): T {
//            val data = redisTemplate.opsForValue().get(k)
//            return SerializationUtil.deserialize(data as ByteArray)
//        }

        fun get(k: Any):Any?{
            return redisTemplate.opsForValue().get(k)
        }

        fun set(key: Any, value: Any, expireTime: Long) {
            redisTemplate.opsForValue().set(key, value)
            expire(key, expireTime)
        }

        fun expire(key: Any, expireTime: Long) {
            redisTemplate.expire(key, expireTime, timeUnit)
        }

        fun del(key: Any) {
            redisTemplate.delete(key)
        }

        fun hGet(key: Any, hk: Any): Any? {
            return redisTemplate.opsForHash<Any, Any>().get(key.toString(), hk.toString())
        }

        fun <T> hMSet(key: String, dataMap: Map<String, T>) {
            redisTemplate.opsForHash<Any, Any>().putAll(key, dataMap)
        }

        fun hMSet(key: String, dataMap: Map<Any, Any>, expireTime: Long) {
            redisTemplate.opsForHash<Any, Any>().putAll(key, dataMap)
            expire(key, expireTime)
        }

        fun  hGetAll(key: Any): Map<Any, Any> {
            return redisTemplate.opsForHash<Any, Any>().entries(key)
        }

        fun hDel(key: Any, hk: Any) {
            redisTemplate.opsForHash<Any, Any>().delete(key, hk)
        }

        fun exists(key: Any): Boolean {
            return redisTemplate.hasKey(key)
        }

        fun multi() {
            redisTemplate.multi()
        }

        fun exec() {
            redisTemplate.exec()
        }
    }

//    fun setIsExist(k: String, v: String): Boolean? {
//        return redisTemplate.execute<Boolean?>(RedisCallback<Boolean> { redisConnection ->
//            val redisSerializer = redisTemplate.stringSerializer
//            val key = redisSerializer.serialize(k)
//            val value = redisSerializer.serialize(v)
//            redisConnection.setNX(key, value)
//        }) as Boolean
//    }
}
