//公共组件数据elpack
import request from '@/plugin/axios'

/**
 * @description 拉取项目树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-03-31 11:17
 * @author dh
 */
export function GetProjectList (data) {
  return request({
    url: '/GetProjectList',
    method: 'post',
    data
  })
}

/**
 * @description 上传文件
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-03-31 11:17
 * @author dh
 */
export function UploadFile (data,headers) {
  return request({
    url: '/UploadFile',
    method: 'post',
    data,
	headers
  })
}

/**
 * @description 拉取组织树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-04-08 09:21
 * @author dh
 */
export function GetSysOrgList (data) {
  return request({
    url: '/GetSysOrgList',
    method: 'post',
	data
  })
}
/**
 * @description 根据组织guid拉取人员信息
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-04-08 09:21
 * @author dh
 */
export function GetUserByOrgGUID (data) {
  return request({
    url: '/GetUserByOrgGUID',
    method: 'post',
	data
  })
}

/**
 * @description 岗位列表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-19 14:21
 * @author dh
 */
export function GetStationlist (data) {
  return request({
    url: '/GetStationlist',
    method: 'post',
	data
  })
}
/**
 * @description 查询会议列表  
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-11-04 14:21
 * @author dh
 */
export function GetMeetInfo (data) {
  return request({
    url: '/GetMeetInfo',
    method: 'post',
	data
  })
}
/**
 * @description 预算科目  
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-11-11 09:21
 * @author dh
 */
export function CW_SubSelShow (data) {
  return request({
    url: '/CW_SubSelShow',
    method: 'post',
	data
  })
}
/**
 * @description 费用项目下拉选框组件
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-11-11 09:21
 * @author dh
 */
export function ProjectSelect (data) {
  return request({
    url: '/ProjectSelect',
    method: 'post',
	data
  })
}
