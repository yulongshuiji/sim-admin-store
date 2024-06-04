import request from '@/utils/request'

// 分页列表
export function chipStoreLogListPage(data) {
  return request({
    url: '/adminTag/chipStoreLogListPage',
    method: 'post',
    data
  })
}

// 新增
export function chipStoreLogAdd(data) {
  return request({
    url: '/adminTag/chipStoreLogAdd',
    method: 'post',
    data
  })
}

// 删除
export function chipStoreLogDelete(data) {
  return request({
    url: '/adminTag/chipStoreLogDelete',
    method: 'post',
    data
  })
}
