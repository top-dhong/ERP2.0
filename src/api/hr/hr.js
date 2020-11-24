import request from '@/plugin/axios'

/**
 * @description 员工信息列表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-19 09:40
 * @author dh
 */
export function GetUserList(data) {
  return request({
    url: '/GetUserList',
    method: 'post',
    data
  })
}

/**
 * @description 获取单个员工信息明细
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-19 09:40
 * @author dh
 */
export function GetSingleUser(data) {
  return request({
    url: '/GetSingleUser',
    method: 'post',
    data
  })
}

/**
 * @description 新建/修改员工信息
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-19 09:40
 * @author dh
 */
export function SaveAndUpUserinfo(data) {
  return request({
    url: '/SaveAndUpUserinfo',
    method: 'post',
    data
  })
}

/**
 * @description 职级定义
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-21 09:40
 * @author dh
 */
export function GetHR_rankList(data) {
  return request({
    url: '/GetHR_rankList',
    method: 'post',
    data
  })
}

/**
 * @description 岗位定义
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-21 09:40
 * @author dh
 */
export function GetStationExlist(data) {
  return request({
    url: '/GetStationExlist',
    method: 'post',
    data
  })
}
