import request from '@/utils/request'

// 获取分页
export function roleListPage(data) {
  return request({
    url: '/adminPermission/roleListPage',
    method: 'post',
    data
  })
}

// 获取所有
export function roleList(data) {
  return request({
    url: '/adminCommon/roleList',
    method: 'post',
    data
  })
}

// 详情
export function roleDetail(data) {
  return request({
    url: '/adminCommon/roleDetail',
    method: 'post',
    data
  })
}

// 新增
export function roleAdd(data) {
  return request({
    url: '/adminPermission/roleAdd',
    method: 'post',
    data
  })
}

// 编辑
export function roleUpdate(data) {
  return request({
    url: '/adminPermission/roleUpdate',
    method: 'post',
    data
  })
}

// 删除
export function roleDelete(data) {
  return request({
    url: '/adminPermission/roleDelete',
    method: 'post',
    data
  })
}
