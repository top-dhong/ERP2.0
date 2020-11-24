import request from '@/plugin/axios'
export function resetDb() {
    return request({
        url: '/resetdb',
        method: 'post',
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '初始化...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        },
        success: {
            type: 'message',
            options: {
                message: '初始化成功',
                type: 'success'
            }
        }
    })
}

/**
 * @description 组织管理 获取数据树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-12 09:40
 * @author dh
 */
export function GetSysOrglist (data) {
  return request({
    url: '/GetSysOrglist',
    method: 'post',
	data
  })
}

/**
 * @description 项目信息 获取数据树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-13 09:40
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
 * @description (单表操作) 新增修改修改
 * @param {Object} data  tabName,jsonStr
 * @return {Object}
 * @createTime 2020-05-12 09:40
 * @author dh
 */
export function SaveAndUpTab (data) {
  return request({
    url: '/SaveAndUpTab',
    method: 'post',
	data
  })
}

/**
 * @description (单表操作) 删除
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-12 09:40
 * @author dh
 */
export function DeleteTab (data) {
  return request({
    url: '/DeleteTab',
    method: 'post',
	data
  })
}

/**
 * @description 查询数据字典
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-14 09:40
 * @author dh
 */
export function GetDictClassList (data) {
  return request({
    url: '/GetDictClassList',
    method: 'post',
	data
  })
}

/**
 * @description 查询数据字典表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-14 09:40
 * @author dh
 */
export function GetDictList (data) {
  return request({
    url: '/GetDictList',
    method: 'post',
	data
  })
}

/**
 * @description 删除字典主表数据
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-14 09:40
 * @author dh
 */
export function DeleteManyTab (data) {
  return request({
    url: '/DeleteManyTab',
    method: 'post',
	data
  })
}

/**
 * @description 登陆控制（登陆mac地址授权）
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-15 09:40
 * @author dh
 */
export function GetUserMaclist (data) {
  return request({
    url: '/GetUserMaclist',
    method: 'post',
	data
  })
}

/**
 * @description 查询rank  公共组建使用
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-22 09:40
 * @author dh
 */
export function GetSysRanklist (data) {
  return request({
    url: '/GetSysRanklist',
    method: 'post',
	data
  })
}

/**
 * @description 查询查询角色定义
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-26 09:40
 * @author dh
 */
export function GetRolelist (data) {
  return request({
    url: '/GetRolelist',
    method: 'post',
	data
  })
}

/**
 * @description 上级角色下拉控件
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-26 09:40
 * @author dh
 */
export function GetSysRolelist (data) {
  return request({
    url: '/GetSysRolelist',
    method: 'post',
	data
  })
}

/**
 * @description  ////查询角色人员 tree
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-26 09:40
 * @author dh
 */
export function GetSysRoleProperylist (data) {
  return request({
    url: '/GetSysRoleProperylist',
    method: 'post',
	data
  })
}

/**
 * @description  ////查询角色人员
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-26 09:40
 * @author dh
 */
export function GetSysRoleUserlist (data) {
  return request({
    url: '/GetSysRoleUserlist',
    method: 'post',
	data
  })
}

/**
 * @description  //查询权限组
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-27 09:40
 * @author dh
 */
export function GetSysGroup (data) {
  return request({
    url: '/GetSysGroup',
    method: 'post',
	data
  })
}

/**
 * @description  //查询权限组人员
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-27 09:40
 * @author dh
 */
export function GetSysUserGroup (data) {
  return request({
    url: '/GetSysUserGroup',
    method: 'post',
	data
  })
}

/**
 * @description  ////查询用户组权限
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-27 09:40
 * @author dh
 */
export function GetUserGroupAuthList (data) {
  return request({
    url: '/GetUserGroupAuthList',
    method: 'post',
	data
  })
}

/**
 * @description  //权限保存
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-06-17 09:40
 * @author dh
 */
export function SaveAuthList (data) {
  return request({
    url: '/SaveAuthList',
    method: 'post',
	data
  })
}
