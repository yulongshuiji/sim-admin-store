import request from '@/utils/request'

// 全部列表
export function counterList(data) {
  return request({
    url: '/adminCommon/counterList',
    method: 'post',
    data
  })
}

// 码种筹码设置
export function counterDetail(data) {
  return request({
    url: '/adminCommon/counterDetail',
    method: 'post',
    data
  })
}

// 编辑
export function counterUpdate(data) {
  return request({
    url: '/adminGame/counterUpdate',
    method: 'post',
    data
  })
}
