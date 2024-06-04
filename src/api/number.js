import request from '@/utils/request'

// 分页列表
export function numberListPage(data) {
  return request({
    url: '/adminReport/numberListPage',
    method: 'post',
    data
  })
}
