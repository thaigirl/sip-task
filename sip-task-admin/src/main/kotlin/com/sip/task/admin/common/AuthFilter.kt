package com.sip.task.admin.common

import com.basicfu.sip.core.model.Result
import com.basicfu.sip.core.util.RedisUtil
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.sip.task.admin.common.constants.Config
import com.sip.task.admin.common.redis.RedisLockUtil
import com.sip.task.admin.model.dto.QrtzUserDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.io.IOException
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * @author tianhu
 * @date 2019/3/28
 */
@Configuration
class AuthFilter {
    @Autowired
    lateinit var redisLockUtil: RedisLockUtil

    private val objectMapper = ObjectMapper()
    //不需要鉴权的监控
    private val SKIP_URLS = listOf("/user/login", "/user/logout", "/user/register")

    @Bean
    fun registFilter(): FilterRegistrationBean<Filter> {
        val registration = FilterRegistrationBean<Filter>()
        registration.filter = object : Filter {
            @Throws(ServletException::class)
            override fun init(filterConfig: FilterConfig) {
            }

            @Throws(IOException::class, ServletException::class)
            override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
                val httpResponse = response as HttpServletResponse
                val httpRequest = request as HttpServletRequest
                allowCrossAccess(httpRequest, httpResponse)
                val requestURI = httpRequest.requestURI
                val method = httpRequest.method
                val token = request.getHeader(Config.AUTHORIZATION)
                if (!SKIP_URLS.contains(requestURI)) {
                    if (token.isNullOrBlank()) {
                        printWriter(httpResponse, Result.error(BaseEnum.ILLEGAL_REQUEST.msg, BaseEnum.ILLEGAL_REQUEST.value))
                        return
                    }
                    val tokenObj = RedisUtil.get<QrtzUserDto>(Config.AUTHORIZATION + token)
                    if (null == tokenObj) {
                        printWriter(httpResponse, Result.error(BaseEnum.LOGIN_TIMEOUT.msg, BaseEnum.LOGIN_TIMEOUT.value))
                        return
                    }
                    RedisUtil.set(Config.AUTHORIZATION + token, tokenObj, Config.EXPIRE_TIME)
                }
                val skip = redisLockUtil.checkSkipUri(requestURI)
                if (!skip) {
                    chain.doFilter(request, httpResponse)
                    return
                }
                val operation = requestURI + method
                val ret = redisLockUtil.checkRepeatOperation(token, operation)
                if (ret) {
                    printWriter(httpResponse, Result.error(BaseEnum.REPEAT_REQUEST.msg, BaseEnum.REPEAT_REQUEST.value))
                    return
                }
                chain.doFilter(request, httpResponse)
                redisLockUtil.expireValue(token, operation)
            }

            @Throws(IOException::class, JsonProcessingException::class)
            private fun printWriter(httpResponse: HttpServletResponse, result: Result<Any>) {
                httpResponse.characterEncoding = "UTF-8"
                httpResponse.contentType = "application/json; charset=utf-8"
                val out = httpResponse.writer
                out.write(objectMapper.writeValueAsString(result))
                out.flush()
                out.close()

            }


            override fun destroy() {
            }

        }
        registration.addUrlPatterns("/*")
        registration.order = 1
        return registration
    }

    protected fun allowCrossAccess(request: HttpServletRequest, response: HttpServletResponse) {
        val allowOrigin = request.getHeader("Origin")
        val allowMethods = "GET,POST,DELETE,PATCH,TRACE,OPTIONS,PUT"
        val allowHeaders = "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, token, TOKEN"
        response.addHeader("Access-Control-Allow-Origin", allowOrigin)
        response.addHeader("Access-Control-Allow-Methods", allowMethods)
        response.addHeader("Access-Control-Allow-Headers", allowHeaders)
        response.addHeader("Access-Control-Allow-Credentials", "true")
    }

}