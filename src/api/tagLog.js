import request from '@/utils/request'

// 分页列表
export function tagLogListPage(data) {
  return request({
    url: '/adminTag/tagLogListPage',
    method: 'post',
    data
  })
}
