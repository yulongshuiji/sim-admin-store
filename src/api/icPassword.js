import request from '@/utils/request'

// 分页列表
export function icPasswordListPage(data) {
  return request({
    url: '/adminPermission/icPasswordListPage',
    method: 'post',
    data
  })
}

// 新增
export function icPasswordAdd(data) {
  return request({
    url: '/adminPermission/icPasswordAdd',
    method: 'post',
    data
  })
}

// 删除
export function icPasswordDelete(data) {
  return request({
    url: '/adminPermission/icPasswordDelete',
    method: 'post',
    data
  })
}
