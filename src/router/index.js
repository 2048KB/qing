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
    meta: { title: '员工管理', icon: '' },
    children: [
      {
        path: 'consultant',
        name: 'Consultant',
        redirect: '/employee/consultant/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '顾问', icon: '' },
        children: [
          {
            path: 'list',
            name: 'ConsultantList',
            component: () => import('@/views/consultant/index'),
            meta: { title: '顾问列表', icon: '' },
          },
          {
            path: 'detail',
            name: 'ConsultantDetail',
            component: () => import('@/views/counselor-detail/index'),
            meta: { title: '顾问详情', icon: '' },
            hidden: true
          },
          {
            path: 'add',
            name: 'ConsultantAdd',
            component: () => import('@/views/add/index'),
            meta: { title: '添加', icon: '' },
            hidden: true
          }
        ]
      },
      {
        path: 'beautician',
        name: 'Beautician',
        redirect: '/employee/beautician/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '美容师', icon: '' },
        children: [
          {
            path: 'list',
            name: 'BeauticianList',
            component: () => import('@/views/consultant/index'),
            meta: { title: '美容师列表', icon: '' },
          },
          {
            path: 'detail',
            name: 'BeauticianDetail',
            component: () => import('@/views/counselor-detail/index'),
            meta: { title: '美容师详情', icon: '' },
            hidden: true
          },
          {
            path: 'add',
            name: 'BeauticianAdd',
            component: () => import('@/views/add/index'),
            meta: { title: '添加', icon: '' },
            hidden: true
          }
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
    meta: { title: '客户管理', icon: '' },
    children: [
      {
        path: 'member',
        name: 'Member',
        redirect: '/client/member/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '会员', icon: '' },
        children: [
          {
            path: 'list',
            name: 'MemberList',
            component: () => import('@/views/listmember/index'),
            meta: { title: '注册会员', icon: '' }
          },
          {
            path: 'detail',
            name: 'MemberDetail',
            component: () => import('@/views/vip-detail/index'),
            meta: { title: '会员详情', icon: '' },
            hidden: true
          }
        ]
      },
      {
        path: 'customer',
        name: 'Customer',
        redirect: '/client/customer/list',
        component: () => import('@/views/menu/index'),
        meta: { title: '顾客', icon: '' },
        children: [
          {
            path: 'list',
            name: 'CustomerList',
            component: () => import('@/views/listmember/index'),
            meta: { title: '顾客列表', icon: '' }
          },
          {
            path: 'detail',
            name: 'CustomerDetail',
            component: () => import('@/views/vip-detail/index'),
            meta: { title: '顾客详情', icon: '' },
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
    meta: { title: '提现管理', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: 'withdraw-user',
        name: 'WithdrawUser',
        component: () => import('@/views/withdraw-user/index'),
        meta: { title: '提现总表', icon: '' }
      }
    ]
  },

  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'Order',
    meta: { title: '订单管理', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order-list/index'),
        meta: { title: '订单列表', icon: ''}
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        // 后面添了详情路由再改
        component: () => import('@/views/order-detail/index'),
        meta: { title: '订单详情', icon: ''},
        hidden: true
      }
    ]
  },

  // 平台概况
  {
    path: '/overview',
    component: Layout,
    redirect: '/overview/platform-overview',
    name: 'Overview',
    meta: { title: '平台概况', icon: '' },
    children: [
      {
        path: 'platform-overview',
        name: 'PlatformOverview',
        component: () => import('@/views/platform-overview/index'),
        meta: { title: '平台概况', icon: '' }
      },
      {
        path: 'platform-fee',
        name: 'PlatformFee',
        component: () => import('@/views/platform-fee/index'),
        meta: { title: '收取费用列表', icon: '' }
      }
    ]
  },

  // 佣金列表
  {
    path: '/bonus',
    component: Layout,
    redirect: '/bonus/bonus-list',
    name: 'bonus',
    meta: { title: '佣金列表', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: 'bonus-list',
        name: 'BonusList',
        component: () => import('@/views/bonus-list/index'),
        meta: { title: '佣金总表', icon: '' }
      }
    ]
  },

  // 运营设置
  {
    path: '/runrules',
    component: Layout,
    redirect: '/runrules/rulesyyset',
    name: 'Runrules',
    meta: { title: '运营设置', icon: '' },
    children: [
      {
        path: 'rulesyyset',
        name: 'RunrulesYyset',
        component: () => import('@/views/runrules-yyset/index'),
        meta: { title: '运营规则设置', icon: '' },
      },
      {
        path: 'rulesfxset',
        name: 'RunrulesFxset',
        component: () => import('@/views/runrules-fxset/index'),
        meta: { title: '分销规则设置', icon: '' },
      }
    ]
  },

  // 后台日志管理
  {
    path: '/log',
    component: Layout,
    redirect: '/log/log-manage',
    name: 'log',
    meta: { title: '后台日志管理', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: 'log-manage',
        name: 'LogManage',
        component: () => import('@/views/log-manage/index'),
        meta: { title: '后台操作日志', icon: '' }
      }
    ]
  },


  // 组织架构管理
  {
    path: '/organize',
    component: Layout,
    redirect: '/organize/organize',
    name: 'Organize',
    meta: { title: '组织架构管理', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: 'organize',
        name: 'organize',
        component: () => import('@/views/organize/index'),
        meta: { title: '组织架构管理', icon: '' },
      }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/admin-list',
    name: 'system',
    meta: { title: '系统管理', icon: '' },
    children: [
      {
        path: 'admin-list',
        name: 'AdminList',
        component: () => import('@/views/admin-list/index'),
        meta: { title: '管理员列表', icon: '' }
      },
      {
        path: 'role-list',
        name: 'RoleList',
        component: () => import('@/views/role-list/index'),
        meta: { title: '角色列表', icon: '' }
      },
      {
        path: 'applyright',
        name: 'ApplyRight',
        component: () => import('@/views/applyright/index'),
        meta: { title: '权限分配', icon: '' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

