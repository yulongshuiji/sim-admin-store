import Vue from 'vue'
import i18n from './lang'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './assets/icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 权限框架注册全局
import permission from '@/directive/permission/index.js'
import { parseTime, resetForm, addDateTimeRange, selectDictLabel, download, handleTree, numberWithCommas } from '@/utils/kent.js'
import Pagination from "@/components/Pagination";
import BackHead from "@/components/backHead/index.vue"
import ServiceBind from "@/components/bindModal/index.vue"


// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateTimeRange = addDateTimeRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.numberWithCommas = numberWithCommas

import createSocket from './common/socket.js';
import ElementUI from 'element-ui'
const socket = createSocket(process.env.VUE_APP_SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
});

Vue.prototype.$socket = socket;

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('BackHead', BackHead)
Vue.component('ServiceBind', ServiceBind)

Vue.prototype.msgSuccess = function (msg) {
  this.$message.closeAll();
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message.closeAll();
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.closeAll();
  this.$message.info(msg);
}

Vue.prototype.$InitSocket = function () {
  let serviceId = localStorage.getItem("serviceId");
  if (serviceId) {
    this.$socket.emit('join-room', {
      service_id: serviceId,
      source: "admin"
    });
  }

  // 监听房间加入
  this.$socket.on('join-room-back', (data) => {
    if (data.code === 200) {
      // 关闭注册
      this.$socket.emit("fingerprint-register-stop", {
        service_id: serviceId
      });
      // 关闭标签读取
      this.$socket.emit("read-tags-stop", {
        service_id: serviceId
      });
    }
  });

  // 监听重复登录
  this.$socket.on('leave-room', (data) => {
    localStorage.removeItem("serviceId");
    store.dispatch('user/resetToken').then(() => {
      location.reload();
    });
  });
}

Vue.use(permission)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
