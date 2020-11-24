import request from '@/plugin/axios'

/**
 * @description 流程列表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function FlowList(data) {
  return request({
    url: '/FlowList',
    method: 'post',
    data
  })
}
/**
 * @description 新建流程
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function FlowAdd(data) {
  return request({
    url: '/FlowAdd',
    method: 'post',
    data
  })
}
/**
 * @description 拉取流程分类树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowType(data) {
  return request({
    url: '/GetFlowType',
    method: 'post',
    data
  })
}
/**
 * @description 流程分类添加/编辑/删除
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function OperFlowType(data) {
  return request({
    url: '/OperFlowType',
    method: 'post',
    data
  })
}
/**
 * @description 拉取流程分类详情
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowInfo(data) {
  return request({
    url: '/GetFlowInfo',
    method: 'post',
    data
  })
}

/**
 * @description 流程定义-基本信息 修改流程基本信息
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function operaFlowDefine(data) {
  return request({
    url: '/operaFlowDefine',
    method: 'post',
    data
  })
}
/**
 * @description GetFlowNodeInfo拉取流程基本信息(基表信息)
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowNodeInfo(data) {
  return request({
    url: '/GetFlowNodeInfo',
    method: 'post',
    data
  })
}
/**
 * @description 修改节点信息
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function operaFlowNode(data) {
  return request({
    url: '/operaFlowNode',
    method: 'post',
    data
  })
}
/**
 * @description //流程出口路径信息
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowPath(data) {
  return request({
    url: '/GetFlowPath',
    method: 'post',
    data
  })
}
/**
 * @description 初始化流程类别可选下拉列表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowDefinePath(data) {
  return request({
    url: '/GetFlowDefinePath',
    method: 'post',
    data
  })
}

/**
 * @description 获取表单列表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFomInfo() {
  return request({
    url: '/GetFomInfo',
    method: 'post'
  })
}

/**
 * @description 获取流程任务  流程列表
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowTaskList(data) {
  return request({
    url: '/GetFlowTaskList',
    method: 'post',
    data
  })
}

/**
 * @description 任务中心>左侧树形菜单 
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function GetFlowTaskClass(data) {
  return request({
    url: '/GetFlowTaskClass',
    method: 'post',
    data
  })
}
/**
 * @description 创建流程初始数据 
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-01-16 11:17
 * @author dh
 */
export function InitFlowInfo(data) {
  return request({
    url: '/InitFlowInfo',
    method: 'post',
    data
  })
}

/**
 * @description 新建流程-选取流程-分类树
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-03-25 09:21
 * @author dh
 */
export function GetFlowTypeTree(data) {
  return request({
    url: '/GetFlowTypeTree',
    method: 'post',
    data
  })
}

/**
 * @description 新建流程-选取流程-分类树下的流程 
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-03-25 09:21
 * @author dh
 */
export function GetFlowTypeList(data) {
  return request({
    url: '/GetFlowTypeList',
    method: 'post',
    data
  })
}

/**
 * @description 暂存、 提交流程
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-03-31 09:21
 * @author dh
 */
export function SaveFlowData(data) {
  return request({
    url: '/SaveFlowData',
    method: 'post',
    data
  })
}
/**
 * @description 添加相关流程 拉取tabledata
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-04-08 09:21
 * @author dh
 */
export function FlowQry(data) {
  return request({
    url: '/FlowQry',
    method: 'post',
    data
  })
}
/**
 * @description  传阅/沟通
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-04-08 09:21
 * @author dh
 */
export function FlowOper(data) {
  return request({
    url: '/FlowOper',
    method: 'post',
    data
  })
}

/**
 * @description  流程代理（列表）
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-05-15 09:21
 * @author dh
 */
export function GetFlowAgentList(data) {
  return request({
    url: '/GetFlowAgentList',
    method: 'post',
    data
  })
}

/**
 * @description  获取请假日期间隔
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-07-23 09:21
 * @author dh
 */
export function GetWorkDay(data) {
  return request({
    url: '/GetWorkDay',
    method: 'post',
    data
  })
}

/**
 * @description  获取用户剩余年假
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-07-23 09:21
 * @author dh
 */
export function GetUserHoliday(data) {
  return request({
    url: '/GetUserHoliday',
    method: 'post',
    data
  })
}

/**
 * @description  获取财务公司列表，如金怡源
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-07-23 09:21
 * @author dh
 */
export function GetCompanyCW(data) {
  return request({
    url: '/GetCompanyCW',
    method: 'post',
    data
  })
}

/**
 * @description  获取管理公司列表，如地产管理公司
 * @param {Object} data
 * @return {Object}
 * @createTime 2020-07-23 09:21
 * @author dh
 */
export function GetCompanyGL(data) {
  return request({
    url: '/GetCompanyGL',
    method: 'post',
    data
  })
}
 
 /**
  * @description  作废流程(只能作废待办流程)
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function SetSelfFlowInvalid(data) {
   return request({
     url: '/SetSelfFlowInvalid',
     method: 'post',
     data
   })
 }
 
 /**
  * @description  流程明细
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function OpenFlow(data) {
   return request({
     url: '/OpenFlow',
     method: 'post',
     data
   })
 }
 
 /**
  * @description  删除相关流程
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function DeleteRelaFlow(data) {
   return request({
     url: '/DeleteRelaFlow',
     method: 'post',
     data
   })
 }
 
 /**
  * @description  删除相关附件
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function DeleteRelaAnnex(data) {
   return request({
     url: '/DeleteRelaAnnex',
     method: 'post',
     data
   })
 }

 /**
  * @description  驳回环节节点列表(驳回弹窗使用)
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function GetFlowRebutList(data) {
   return request({
     url: '/GetFlowRebutList',
     method: 'post',
     data
   })
 }
 
 /**
  * @description  驳回提交
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function FlowRebut(data) {
   return request({
     url: '/FlowRebut',
     method: 'post',
     data
   })
 }
 /**
  * @description  转办提交
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-15 09:21
  * @author dh
  */
 export function FlowTurnDo(data) {
   return request({
     url: '/FlowTurnDo',
     method: 'post',
     data
   })
 }
 
 /**
  * @description  传阅提交
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-26 09:21
  * @author dh
  */
 export function FlowCirculate(data) {
   return request({
     url: '/FlowCirculate',
     method: 'post',
     data
   })
 }
 /**
  * @description  收回提交
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-26 09:21
  * @author dh
  */
 export function FlowRetake(data) {
   return request({
     url: '/FlowRetake',
     method: 'post',
     data
   })
 }
 /**
  * @description  沟通提交
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-26 09:21
  * @author dh
  */
 export function FlowConsult(data) {
   return request({
     url: '/FlowConsult',
     method: 'post',
     data
   })
 }
 /**
  * @description  资金登记-初始化资金登记数据
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-29 09:21
  * @author dh
  */
 export function ShowPayMent(data) {
   return request({
     url: '/ShowPayMent',
     method: 'post',
     data
   })
 }
 
 /**
  * @description  资金登记-入库
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-29 09:21
  * @author dh
  */
 export function SavePayMent(data) {
   return request({
     url: '/SavePayMent',
     method: 'post',
     data
   })
 }
 /**
  * @description  资金登记-查询
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-29 09:21
  * @author dh
  */
 export function ShowPayInfo(data) {
   return request({
     url: '/ShowPayInfo',
     method: 'post',
     data
   })
 }
 /**
  * @description  资金登记-入库
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-29 09:21
  * @author dh
  */
 export function SavePayInfo(data) {
   return request({
     url: '/SavePayInfo',
     method: 'post',
     data
   })
 }
 /**
  * @description  预算科目金额累计   
  * @param {Object} data
  * @return {Object}
  * @createTime 2020-10-29 09:21
  * @author dh
  */
 export function CW_YCLXJK_YS(data) {
   return request({
     url: '/CW_YCLXJK_YS',
     method: 'post',
     data
   })
 }
 