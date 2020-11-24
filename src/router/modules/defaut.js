import layoutHeaderAside from '@/layout/header-aside'
import temp from './temp'
const meta = { requiresAuth: true }

export default [
	{
	  path: '/flow',
	  name: 'flow',
	  meta,
	  redirect: { name: 'flow-flowclass' },
	  component: layoutHeaderAside,
	  children: (pre => [
		  { path: 'flowclass', name: `${pre}flowclass`, component: () => import('@/pages/flow/flowclass'), meta: { meta, title: '流程分类' } },
		  { path: 'flowdefine', name: `${pre}flowdefine`, component: () => import('@/pages/flow/flowdefine'), meta: { meta, title: '流程定义' } },
		  { path: 'flowlist', name: `${pre}flowlist`, component: () => import('@/pages/flow/flowlist'), meta: { meta, title: '流程任务' } },
		  { path: 'flowadd', name: `${pre}flowadd`, component: () => import('@/pages/flow/flowadd'), meta: { meta, cache: true,title: '新建流程' } },
		  // { path: 'flowaddpush', name: `${pre}flowaddpush`, component: () => import('@/pages/flow/flowaddpush'), meta: { meta, cache: true,title: '新建流程' } },
		  ...temp,
		  { path: 'flowtask', name: `${pre}flowtask`, component: () => import('@/pages/flow/flowtask'), meta: { meta, title: '任务中心' } },
		  { path: 'flowagent', name: `${pre}flowagent`, component: () => import('@/pages/flow/flowagent'), meta: { meta, title: '流程代理' } },
	  ])('flow-')
	},
	{
	  path: '/sys',
	  name: 'sys',
	  meta,
	  redirect: { name: 'sys-menu' },
	  component: layoutHeaderAside,
	  children: (pre => [
		{ path: 'loginCon', name: `${pre}loginCon`, component: () => import('@/pages/sys/loginCon'), meta: { meta, title: '登陆控制' } },
		{ path: 'menu', name: `${pre}menu`, component: () => import('@/pages/sys/menu'), meta: { meta, title: '功能菜单' } },
		{ path: 'route', name: `${pre}route`, component: () => import('@/pages/sys/route'), meta: { meta, title: '路由管理' } },
		{ path: 'role', name: `${pre}role`, component: () => import('@/pages/sys/role'), meta: { meta, title: '角色定义' } },
		{ path: 'role-user', name: `${pre}role-user`, component: () => import('@/pages/sys/role-user'), meta: { meta, title: '角色人员' } },
		{ path: 'user', name: `${pre}user`, component: () => import('@/pages/sys/user'), meta: { meta, title: '用户管理' } },
		{ path: 'interface', name: `${pre}interface`, component: () => import('@/pages/sys/interface'), meta: { meta, title: '接口管理' } },
		{ path: 'projectInfo', name: `${pre}projectInfo`, component: () => import('@/pages/sys/projectInfo'), meta: { meta, title: '项目信息' } },
		{ path: 'organ', name: `${pre}organ`, component: () => import('@/pages/sys/organ'), meta: { meta, title: '组织机构' } },
		{ path: 'dict', name: `${pre}dict`, component: () => import('@/pages/sys/dict'), meta: { meta, title: '数据字典' } },
		{ path: 'auth-group', name: `${pre}auth-group`, component: () => import('@/pages/sys/auth-group'), meta: { meta, title: '权限组管理' } },
		{ path: 'auth', name: `${pre}auth`, component: () => import('@/pages/sys/auth'), meta: { meta, title: '权限管理' } },
	  ])('sys-')
	},
	{
	  path: '/cost',
	  name: 'cost',
	  meta,
	  redirect: { name: 'cost-menu' },
	  component: layoutHeaderAside,
	  children: (pre => [
		  { path: 'conType', name: `${pre}conType`, component: () => import('@/pages/cost/conType'), meta: { meta, title: '合同分类' } },
		  { path: 'provType', name: `${pre}provType`, component: () => import('@/pages/cost/provType'), meta: { meta, title: '供应商分类' } },
	  ])('cost-')
	},
	{
	  path: '/hr',
	  name: 'hr',
	  meta,
	  redirect: { name: 'hr-menu' },
	  component: layoutHeaderAside,
	  children: (pre => [
		{ path: 'userlist', name: `${pre}userlist`, component: () => import('@/pages/hr/userlist'), meta: { meta, cache: true,title: '人员信息' } },
		{ path: 'userlist/addUpUser', name: `${pre}userlist-addUpUser`, component: () => import('@/pages/hr/userlist/addUpUser'), meta: { meta, cache: true,title: '新建/编辑员工' } },
		{ path: 'userlist/detailUser', name: `${pre}userlist-detailUser`, component: () => import('@/pages/hr/userlist/detailUser'), meta: { meta, cache: true,title: '员工明细' } },
		{ path: 'hr-rank', name: `${pre}hr-rank`, component: () => import('@/pages/hr/hr-rank'), meta: { meta, cache: true,title: '职级定义' } },
		{ path: 'station-ex-list', name: `${pre}station-ex-list`, component: () => import('@/pages/hr/station-ex-list'), meta: { meta, cache: true,title: '岗位定义' } },
	  ])('hr-')
	}
]
