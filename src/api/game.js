import request from '@/utils/request'

// 全部列表
export function gameList(data) {
  return request({
    url: '/adminCommon/gameList',
    method: 'post',
    data
  })
}

// 详情
export function gameDetail(data) {
  return request({
    url: '/adminCommon/gameDetail',
    method: 'post',
    data
  })
}

// 倍率
export function gamePrice(data) {
  return request({
    url: '/adminGame/gamePrice',
    method: 'post',
    data
  })
}


