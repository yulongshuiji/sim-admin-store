import request from '@/utils/request'

// 分页列表
export function tagListPage(data) {
  return request({
    url: '/adminTag/tagListPage',
    method: 'post',
    data
  })
}

// 新增
export function tagAdd(data) {
  return request({
    url: '/adminTag/tagAdd',
    method: 'post',
    data
  })
}

// 删除
export function tagDelete(data) {
  return request({
    url: '/adminTag/tagDelete',
    method: 'post',
    data
  })
}

// 买码退码
export function tagSell(data) {
  return request({
    url: '/adminTag/tagSell',
    method: 'post',
    data
  })
}

// 筹码查验
export function tagParse(data) {
  return request({
    url: '/adminTag/tagParse',
    method: 'post',
    data
  })
}
