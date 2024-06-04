import request from '@/utils/request'

// 查询路由
export function getRoutes() {
  return request({
    url: '/adminCommon/routeIndex',
    method: 'post'
  })
}

// 查询路由
export function menuTreeSelect(data) {
  return request({
    url: '/adminCommon/menuTreeSelect',
    method: 'post',
    data
  })
}

// 查询路由
export function roleMenuTreeSelect(data) {
  return request({
    url: '/adminCommon/roleMenuTreeSelect',
    method: 'post',
    data
  })
}

// 查询路由
export function routeList(data) {
  return request({
    url: '/adminCommon/routeList',
    method: 'post',
    data
  })
}

// 路由详情
export function routeDetail(data) {
  return request({
    url: '/adminCommon/routeDetail',
    method: 'post',
    data
  })
}

// 新增路由
export function routeAdd(data) {
  return request({
    url: '/adminPermission/routeAdd',
    method: 'post',
    data
  })
}

// 更新路由
export function routeUpdate(data) {
  return request({
    url: '/adminPermission/routeUpdate',
    method: 'post',
    data
  })
}

// 删除路由
export function routeDelete(data) {
  return request({
    url: '/adminPermission/routeDelete',
    method: 'post',
    data
  })
}
