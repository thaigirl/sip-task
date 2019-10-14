package com.sip.task.admin.service

import com.basicfu.sip.core.common.example
import com.basicfu.sip.core.common.exception.CustomException
import com.basicfu.sip.core.common.generate
import com.basicfu.sip.core.service.BaseService
import com.basicfu.sip.core.util.RedisUtil
import com.basicfu.sip.core.util.RequestUtil
import com.github.pagehelper.PageInfo
import com.sip.task.admin.common.BaseEnum
import com.sip.task.admin.common.cache.ExecutorCache
import com.sip.task.admin.common.constants.Config
import com.sip.task.admin.common.util.PasswordUtil
import com.sip.task.admin.mapper.QrtzUserMapper
import com.sip.task.admin.model.dto.QrtzUserDto
import com.sip.task.admin.model.po.QrtzUser
import com.sip.task.admin.model.vo.QrtzUserVo
import org.springframework.beans.BeanUtils
import org.springframework.stereotype.Service
import java.util.*

/**
 * <p>
 * 用户
 * </p>
 *
 * @author liyang
 * @since 2019-06-15
 */
@Service
class QrtzUserService : BaseService<QrtzUserMapper, QrtzUser>() {

    fun list(vo: QrtzUserVo): PageInfo<QrtzUserDto> {
        return selectPage(example<QrtzUser> {
            andLike(QrtzUser::name, vo.name)
        })
    }

    fun all(): List<QrtzUserDto> {
        var list = mapper.selectAll()
        list.sortByDescending { it.createTime }
        return to(list)
    }

    fun insert(vo: QrtzUserVo): Int {
        vo.password = PasswordUtil.encode(vo.password!!)
        val po = dealInsert(to<QrtzUser>(vo))
        return mapper.insertSelective(po)
    }

    fun update(vo: QrtzUserVo): Int {
        val po = dealUpdate(to<QrtzUser>(vo))
        return mapper.updateByPrimaryKeySelective(po)
    }

    fun delete(ids: List<Long>?): Int {
        ids?.forEach { ExecutorCache.remove(it) }
        return deleteByIds(ids)
    }

    fun get(id: Long): QrtzUser? {
        return mapper.selectByPrimaryKey(id)
    }

    fun login(vo: QrtzUserVo): Any? {
        val exist = mapper.selectOne(generate {
            name = vo.name
        }) ?: throw CustomException("您的账号输入有误")
        if (!vo.password.equals(exist.password) && !PasswordUtil.matches(vo.password!!, exist.password!!)) throw CustomException("您的密码输入有误")
        val userInfo = QrtzUserDto()
        BeanUtils.copyProperties(exist, userInfo)
        val token = UUID.randomUUID().toString().replace("-".toRegex(), "")
        userInfo.token = token
        RedisUtil.set(Config.AUTHORIZATION + token, userInfo, Config.EXPIRE_TIME)
        return userInfo
    }

    fun me(): QrtzUserDto? {
        val token = RequestUtil.getHeader(Config.AUTHORIZATION) ?: throw CustomException(BaseEnum.ILLEGAL_REQUEST)
        return RedisUtil.get<QrtzUserDto>(Config.AUTHORIZATION + token) ?: throw CustomException(BaseEnum.LOGIN_TIMEOUT)
    }

    fun logout() {
        RedisUtil.del(Config.AUTHORIZATION + (me()?.token ?: ""))
    }
}
