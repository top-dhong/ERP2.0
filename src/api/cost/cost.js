import request from '@/plugin/axios'

/**
 * @description 合同分类 获取数据树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-12 09:40
 * @author dh
 */
export function GetConTypelist (data) {
  return request({
    url: '/GetConTypelist',
    method: 'post',
	data
  })
}

/**
 * @description 供应商分类
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-14 09:40
 * @author dh
 */
export function GetprovTypelist (data) {
  return request({
    url: '/GetprovTypelist',
    method: 'post',
	data
  })
}
