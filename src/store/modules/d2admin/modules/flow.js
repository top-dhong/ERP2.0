import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
import router from '@/router'
import { InitFlowInfo, SaveFlow,OpenFlow } from "@/api/flow/flow";
import qs from 'qs'
import store from '@/store/index'
import menuAside from '@/menu/aside'

//新建流程时加载基础默认数据  编辑流程时不加载基础默认数据只加载流程明细数据
export default {
  namespaced: true,
  state: {
    flowData: {}
  },
  actions: {
    /**
     * @description 初始化流程基础数据和核心数据(加载模版和基础数据)
     */
    initData({ state, dispatch }, { FlowTypeGUID = '' } = {}) {
      return new Promise((resolve, reject) => {
        console.log(this);
        InitFlowInfo(qs.stringify({ FlowTypeGUID }))
          .then(async res => {
            if (typeof (res) != 'undefined' && res.code == 0) {
              resolve(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
	/**
	 * @description 初始化流程明细数据()
	 */
	OpenFlow({ state, dispatch }, { FlowGUID = '' } = {}) {
	  return new Promise((resolve, reject) => {
	    console.log(this);
	    OpenFlow(qs.stringify({ FlowGUID }))
	      .then(async res => {
	        if (typeof (res) != 'undefined' && res.code == 0) {
	          resolve(res)
	        }
	      })
	      .catch(err => {
	        reject(err)
	      })
	  })
	},
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout() {
        // 删除cookie
        util.cookies.remove('Token')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true })
        // 跳转路由
        router.push({
          name: 'login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('确定要退出当前账号吗', '退出登录', {
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            // Message({
            //   message: '取消退出操作'
            // })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        //await dispatch('d2admin/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, { root: true })
        // DB -> store 持久化数据加载颜色设置
        //await dispatch('d2admin/color/load', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
