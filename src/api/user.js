import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/admin/login',
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
