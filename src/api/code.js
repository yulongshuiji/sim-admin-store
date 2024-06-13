import request from '@/utils/request'


// 筹码查验
export function codeInResposity(data) {
  return request({
    url: '/adminStore/tagAdd',
    method: 'post',
    data
  })
}
