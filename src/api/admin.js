import request from '@/utils/request'

// 查询管理员
export function adminListPage(data) {
  return request({
    url: '/adminPermission/adminListPage',
    method: 'post',
    data
  })
}

// 查询管理员
export function adminList(data) {
  return request({
    url: '/adminCommon/adminList',
    method: 'post',
    data
  })
}

// 查询管理员
export function adminDetail(data) {
  return request({
    url: '/adminCommon/adminDetail',
    method: 'post',
    data
  })
}

// 新增
export function adminAdd(data) {
  return request({
    url: '/adminPermission/adminAdd',
    method: 'post',
    data
  })
}

// 编辑
export function adminUpdate(data) {
  return request({
    url: '/adminPermission/adminUpdate',
    method: 'post',
    data
  })
}

// 删除
export function adminDelete(data) {
  return request({
    url: '/adminPermission/adminDelete',
    method: 'post',
    data
  })
}

// 指纹注册
export function adminFingerprint(data) {
  return request({
    url: '/adminPermission/adminFingerprint',
    method: 'post',
    data
  })
}
