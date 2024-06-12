import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        title: 'Profile',
        icon: 'user',
        noCache: true
      }
    }]
  },
  {
    path: '/account-room',
    component: Layout,
    redirect: '/account-room/index',
    hidden: true,
    children: [{
        path: 'index',
        component: () => import('@/views/account-room/index'),
        name: 'AccountRoom',
        meta: {
          title: 'AccountRoom',
          noCache: true
        },
      },
      {
        path: 'reponsity',
        hidden: true,
        component: () => import('@/views/account-room/feat/reponsityData/index'),
        name: 'reponsity',
        meta: {
          title: 'reponsity',
          noCache: true
        },
      },
      {
        path: 'code-room',
        hidden: true,
        component: () => import('@/views/account-room/feat/codeRoom/dataCenter'),
        name: 'codeRoom',
        meta: {
          title: 'codeRoom',
          noCache: true
        },
        children: [{
          hidden: true,
          name: 'dataCenter',
          path: 'dataCenter',
          component: () => import('@/views/account-room/feat/codeRoom/dataCenter'),
          meta: {
            title: 'dataCenter',
            noCache: true
          },
        }]
      },
      {
        path: 'counter',
        hidden: true,
        component: () => import('@/views/account-room/feat/counter/index'),
        name: 'counter',
        meta: {
          title: 'counter',
          noCache: true
        },
      },
      {
        path: 'counter/dataCenter',
        hidden: true,
        component: () => import('@/views/account-room/feat/counter/dataCenter/index'),
        name: 'counterdataCenter',
        meta: {
          title: 'counterdataCenter',
          noCache: true
        },
      },
      {
        path: 'counting-room/dataCenter',
        hidden: true,
        component: () => import('@/views/account-room/feat/countingRoom/dataCenter.vue'),
        name: 'countingRoomdataCenter',
        meta: {
          title: 'countingRoomdataCenter',
          noCache: true
        },
      },
      {
        path: 'ledger/inventory',
        hidden: true,
        component: () => import('@/views/account-room/feat/ledger/inventory'),
        name: 'ledgerInventory',
        meta: {
          title: 'ledgerInventory',
          noCache: true
        },
      },
      {
        path: 'ledger/guest',
        hidden: true,
        component: () => import('@/views/account-room/feat/ledger/guest.vue'),
        name: 'ledgerguest',
        meta: {
          title: 'ledgerguest',
          noCache: true
        },
      },
      {
        path: 'ledger/tableTop',
        hidden: true,
        component: () => import('@/views/account-room/feat/ledger/tableTop.vue'),
        name: 'ledgertableTop',
        meta: {
          title: 'ledgertableTop',
          noCache: true
        },
      },
      {
        path: 'ledger/accounting',
        hidden: true,
        component: () => import('@/views/account-room/feat/ledger/accounting.vue'),
        name: 'ledgeraccounting',
        meta: {
          title: 'ledgeraccounting',
          noCache: true
        },
      },
    ]
  },
  {
    path: '/dataView',
    component: Layout,
    hidden: true,
    redirect: '/account-room/index',
    children: [{
      path: 'index',
      component: () => import('@/views/account-room/feat/dataView/index'),
      name: 'DataView',
      meta: {
        title: 'AccountRoom',
        noCache: true
      },
    }]
  }, {
    path: '/permission',
    component: Layout,
    hidden: true,
    redirect: '/permission/menu',
    children: [{
        path: 'menu',
        component: () => import('@/views/permission/menu.vue'),
        name: 'Permission',
        meta: {
          title: 'Permission',
          noCache: true
        },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'Permission',
        meta: {
          title: 'Permission',
          noCache: true
        },
      },
      {
        path: 'admin',
        component: () => import('@/views/permission/admin.vue'),
        name: 'Permission',
        meta: {
          title: 'Permission',
          noCache: true
        },
      }
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
