import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/page-index', component: () => import('@/views/page-index/index'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/warning', component: () => import('@/views/warning'), hidden: true },
  { path: '/500', component: () => import('@/views/500'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // 新增 `员工管理`
  // 顾问列表
  // 美容师列表
  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/consultant/list',
    name: 'Employee',
    meta: { title: '员工管理', icon: 'example' },
    children: [
      {
        path: 'consultant',
        name: 'Consultant',
        redirect: '/employee/consultant/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '顾问', icon: 'table' },
        children: [
          {
            path: 'list',
            name: 'ConsultantList',
            component: () => import('@/views/consultant/index'),
            meta: { title: '顾问列表', icon: 'table' },
          },
          {
            path: 'detail',
            name: 'ConsultantDetail',
            component: () => import('@/views/counselor-detail/index'),
            meta: { title: '顾问详情', icon: 'table' },
            hidden: true
          },
        ]
      },
      {
        path: 'beautician',
        name: 'Beautician',
        redirect: '/employee/beautician/list',
        component: () => import('@/views/consultant/index'),
        meta: { title: '美容师', icon: 'table' },
        children: [
          {
            path: 'list',
            name: 'BeauticianList',
            component: () => import('@/views/consultant/index'),
            meta: { title: '美容师列表', icon: 'table' },
          },
          {
            path: 'detail',
            name: 'BeauticianDetail',
            component: () => import('@/views/counselor-detail/index'),
            meta: { title: '美容师详情', icon: 'table' },
            hidden: true
          },
        ]
      }
    ]
  },

  // 客户管理
  {
    path: '/client',
    component: Layout,
    redirect: '/client/member/list',
    name: 'Client',
    meta: { title: '客户管理', icon: 'example' },
    children: [
      {
        path: 'member',
        name: 'Member',
        redirect: '/client/member/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '会员', icon: 'listmember' },
        children: [
          {
            path: 'list',
            name: 'MemberList',
            component: () => import('@/views/listmember/index'),
            meta: { title: '注册会员', icon: 'listmember' }
          },
          {
            path: 'detail',
            name: 'MemberDetail',
            component: () => import('@/views/vip-detail/index'),
            meta: { title: '会员详情', icon: 'table' },
            hidden: true
          }
        ]
      },
      {
        path: 'customer',
        name: 'Customer',
        redirect: '/client/customer/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '顾客', icon: 'listmember' },
        children: [
          {
            path: 'list',
            name: 'CustomerList',
            component: () => import('@/views/listmember/index'),
            meta: { title: '顾客列表', icon: 'listmember' }
          },
          {
            path: 'detail',
            name: 'CustomerDetail',
            component: () => import('@/views/vip-detail/index'),
            meta: { title: '顾客详情', icon: 'table' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 提现管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/withdraw-user',
    name: 'account',
    meta: { title: '提现管理', icon: 'example' },
    children: [
      {
        path: 'withdraw-user',
        name: 'WithdrawUser',
        component: () => import('@/views/withdraw-user/index'),
        meta: { title: '提现总表', icon: 'withdraw-user' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order-list/index'),
        meta: { title: '订单列表'}
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        // 后面添了详情路由再改
        component: () => import('@/views/order-list/index'),
        meta: { title: '订单详情'}
      }
    ]
  },

  // 平台概况
  {
    path: '/overview',
    component: Layout,
    redirect: '/overview/platform-overview',
    name: 'Overview',
    meta: { title: '平台概况', icon: 'example' },
    children: [
      {
        path: 'platform-overview',
        name: 'PlatformOverview',
        component: () => import('@/views/platform-overview/index'),
        meta: { title: '平台概况', icon: 'platform-overview' }
      },
      {
        path: 'platform-fee',
        name: 'PlatformFee',
        component: () => import('@/views/platform-fee/index'),
        meta: { title: '收取费用列表', icon: 'platform-fee' }
      }
    ]
  },

  // 佣金列表
  {
    path: '/bonus',
    component: Layout,
    redirect: '/bonus/bonus-list',
    name: 'bonus',
    meta: { title: '佣金列表', icon: 'example' },
    children: [
      {
        path: 'bonus-list',
        name: 'BonusList',
        component: () => import('@/views/bonus-list/index'),
        meta: { title: '佣金总表', icon: 'bonus-list' }
      }
    ]
  },

  // 后台日志管理 
  {
    path: '/log',
    component: Layout,
    redirect: '/log/log-manage',
    name: 'log',
    meta: { title: '后台日志管理', icon: 'example' },
    children: [
      {
        path: 'log-manage',
        name: 'LogManage',
        component: () => import('@/views/log-manage/index'),
        meta: { title: '后台操作日志', icon: 'log-manage' }
      }
    ]
  },

  // 系统管理 
  {
    path: '/system',
    component: Layout,
    redirect: '/system/admin-list',
    name: 'system',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'admin-list',
        name: 'AdminList',
        component: () => import('@/views/admin-list/index'),
        meta: { title: '管理员列表', icon: 'admin-list' }
      },
      {
        path: 'role-list',
        name: 'RoleList',
        component: () => import('@/views/role-list/index'),
        meta: { title: '角色列表', icon: 'role-list' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

