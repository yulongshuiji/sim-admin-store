import request from '@/utils/request'


// 筹码查验
export function codeInResposity(data) {
  return request({
    url: '/adminStore/tagAdd',
    method: 'post',
    data
  })
}

// 筹码出入库清单
export function codeInResposityList(data) {
  return request({
    url: '/adminStore/tagRepositoryListPage',
    method: 'post',
    data
  })
}
