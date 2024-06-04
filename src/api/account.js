import request from '@/utils/request'

// 分页列表
export function userListPage(data) {
  return request({
    url: '/adminUser/userListPage',
    method: 'post',
    data
  })
}

// 列表
export function agentList(data) {
  return request({
    url: '/adminUser/agentList',
    method: 'post',
    data
  })
}

// 代理报表
export function reportUserListPage(data) {
  return request({
    url: '/adminReport/reportUserListPage',
    method: 'post',
    data
  })
}

// 详情
export function userDetail(data) {
  return request({
    url: '/adminUser/userDetail',
    method: 'post',
    data
  })
}

// 新增
export function userAdd(data) {
  return request({
    url: '/adminUser/userAdd',
    method: 'post',
    data
  })
}

// 编辑
export function userUpdate(data) {
  return request({
    url: '/adminUser/userUpdate',
    method: 'post',
    data
  })
}

// 删除
export function userDelete(data) {
  return request({
    url: '/adminUser/userDelete',
    method: 'post',
    data
  })
}

