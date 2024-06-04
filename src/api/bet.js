import request from '@/utils/request'

// 分页列表
export function betListPage(data) {
  return request({
    url: '/adminReport/betListPage',
    method: 'post',
    data
  })
}
