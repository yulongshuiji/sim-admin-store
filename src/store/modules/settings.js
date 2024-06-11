import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  showBindeService: false,
  serviceList: []
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_SERVICE: (state, data) => {
    // eslint-disable-next-line no-prototype-builtins
  state.showBindeService = data
  },
  CHANGE_SERVICELIST: (state, data) => {
    // eslint-disable-next-line no-prototype-builtins
   state.serviceList = data
   console.log(data);
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeService({ commit }, data) {
    console.log("触发", data);
    commit('CHANGE_SERVICE', data)
  },
  changeServiceList({ commit }, data) {
    commit('CHANGE_SERVICELIST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

