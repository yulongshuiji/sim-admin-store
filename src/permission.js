import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import {
  serviceBind,
  serviceBindList,
  serviceIsBind
} from '@/api/user'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 判断是否有绑定服务点
  // let serviceId = localStorage.getItem("serviceId")
  // if(!serviceId){
  //   if (to.path !== '/login') {
  //     await store.dispatch('user/resetToken')
  //     Message.error('重复绑定服务点')
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const {
            roles
          } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // finish progress bar
  if (from.path == '/login') {
    checkServiceList()
  }
  NProgress.done()
})

import vueInstance from './main'

async function checkServiceList() {
  const res = await serviceIsBind()
  console.log("是否需要绑定服务点", res.data.is_service);
  const {
    is_service
  } = res.data
  if (!is_service) return
  const serviceId = localStorage.getItem('serviceId')
  const res2 = await serviceBindList()
  const bindList = res2.data
  const needBind = bindList.some(item => item.service_id == serviceId && item.is_bind)
  if (needBind) {
    vueInstance.$InitSocket()
  } else {
    console.log("可绑定服务点列表", res2, "是否被绑定", needBind);
    store.dispatch('settings/changeServiceList', res2.data)
    store.dispatch('settings/changeService', true)
  }

}
