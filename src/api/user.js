import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/adminStore/login',
    method: 'post',
    data: data
  })
}

// 获取当前登录用户信息
export function getInfo(token) {
  return request({
    url: '/adminCommon/adminInfo',
    method: 'post'
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/adminCommon/logout',
    method: 'post'
  })
}

// 是否需要绑定服务点
export function serviceIsBind() {
  return request({
    url: '/adminCommon/serviceTypeDetail',
    method: 'post',
    data: {
      service_type: 2
    }
  })
}

// 服务点列表
export function serviceBindList() {
  return request({
    url: '/adminCommon/serviceList',
    method: 'post',
    data: {
      service_type: 2
    }
  })
}

// 服务点绑定
export function serviceBind(data) {
  return request({
    url: '/adminCommon/serviceBind',
    method: 'post',
    data: {
      ...data,
    }
  })
}

