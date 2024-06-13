const state = {
  currencyList: [],
  counterList: [],
  selectTime: [],
  codeNum: 0,
  codeDes: ''
}

const mutations = {
  _setCurrntList: (state, data) => {
    state.currencyList = data
  },
  _setCounterList: (state, data) => {
    state.counterList = data
  },
  _setCurrentTime: (state, data) => {
    state.selectTime = data
  },
  _setCodeNum: (state, data) => {
    state.codeNum = data
  },
  _setCodeDes: (state, data) => {
    state.codeDes = data
  },

}

const actions = {
  setCurrntList({
    commit
  }, data) {
    commit('_setCurrntList', data)
  },
  setCounterList({
    commit
  }, data) {
    commit('_setCounterList', data)
  },
  setCurrentTime({
    commit
  }, data) {
    commit('_setCurrentTime', data)
  },
  setCodeNum({
    commit
  }, data) {
    commit('_setCodeNum', data)
  },
  setCodeDes({
    commit
  }, data) {
    commit('_setCodeDes', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
