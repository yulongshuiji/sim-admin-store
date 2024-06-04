import request from '@/utils/request'

// 分页列表
export function serviceListPage(data) {
  return request({
    url: '/adminGame/serviceListPage',
    method: 'post',
    data
  })
}

// 列表
export function serviceList(data) {
  return request({
    url: '/admin/serviceList',
    method: 'post',
    data
  })
}

// 新增
export function serviceAdd(data) {
  return request({
    url: '/adminGame/serviceAdd',
    method: 'post',
    data
  })
}

// 编辑
export function serviceUpdate(data) {
  return request({
    url: '/adminGame/serviceUpdate',
    method: 'post',
    data
  })
}

// 删除
export function serviceDelete(data) {
  return request({
    url: '/adminGame/serviceDelete',
    method: 'post',
    data
  })
}

