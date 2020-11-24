import { version } from '../package'

export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        meta: {
          title: '我的主页',
          requiresAuth: false
        }
      }
    ]
  },
  // 版本
  releases: {
    version
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: '经典',
        name: 'd2',
        preview: 'image/theme/d2/preview@2x.png'
      },
      // {
      //   title: '紫罗兰',
      //   name: 'violet',
      //   preview: 'image/theme/violet/preview@2x.png'
      // },
      {
        title: '线条',
        name: 'line',
        backgroundImage: 'image/theme/line/bg.jpg',
        preview: 'image/theme/line/preview@2x.png'
      },
      // {
      //   title: '沉稳蓝',
      //   name: 'tomorrow-night-blue',
      //   preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
      // },
      {
        title: '流星',
        name: 'star',
        backgroundImage: 'image/theme/star/bg.jpg',
        preview: 'image/theme/star/preview@2x.png'
      },
	  {
	    title: '沙滩',
	    name: 'sand',
	    backgroundImage: 'image/theme/sand/bg.jpg',
	    preview: 'image/theme/sand/preview@2x.png'
	  },
	  {
	    title: '白云',
	    name: 'cloud',
	    backgroundImage: 'image/theme/cloud/bg.jpg',
	    preview: 'image/theme/cloud/preview@2x.png'
	  }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: '请重新登陆'
    }
  }
}
