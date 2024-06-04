import request from '@/utils/request'

// 全部列表
export function currencyList(data) {
  return request({
    url: '/adminCommon/currencyList',
    method: 'post',
    data
  })
}

// 编辑
export function currencyUpdate(data) {
  return request({
    url: '/adminGame/currencyUpdate',
    method: 'post',
    data
  })
}