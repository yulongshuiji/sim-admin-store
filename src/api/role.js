import request from '@/utils/request'

// 获取分页
export function roleListPage(data) {
  return request({
    url: '/adminCommon/roleListPage',
    method: 'post',
    data: {
      ...data,
      service_type: 2
    }
  })
}

// 获取所有
export function roleList(data) {
  return request({
    url: '/adminCommon/roleList',
    method: 'post',
    data: {
      ...data,
      service_type: 2
    }
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
    url: '/adminCommon/roleAdd',
    method: 'post',
    data: {
      ...data,
      service_type: 2
    }
  })
}

// 编辑
export function roleUpdate(data) {
  return request({
    url: '/adminCommon/roleUpdate',
    method: 'post',
    data: {
      ...data,
      service_type: 2
    }
  })
}

// 删除
export function roleDelete(data) {
  return request({
    url: '/adminCommon/roleDelete',
    method: 'post',
    data
  })
}
