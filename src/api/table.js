import request from '@/utils/request'

// 分页列表
export function tableListPage(data) {
  return request({
    url: '/adminGame/tableListPage',
    method: 'post',
    data
  })
}

// 列表
export function tableList(data) {
  return request({
    url: '/adminCommon/tableList',
    method: 'post',
    data
  })
}

// 详情
export function tableDetail(data) {
  return request({
    url: '/adminCommon/tableDetail',
    method: 'post',
    data
  })
}

// 新增
export function tableAdd(data) {
  return request({
    url: '/adminGame/tableAdd',
    method: 'post',
    data
  })
}

// 编辑
export function tableUpdate(data) {
  return request({
    url: '/adminGame/tableUpdate',
    method: 'post',
    data
  })
}

// 删除
export function tableDelete(data) {
  return request({
    url: '/adminGame/tableDelete',
    method: 'post',
    data
  })
}

// 限红设置
export function tableLimitSetting(data) {
  return request({
    url: '/adminGame/tableLimitSetting',
    method: 'post',
    data
  })
}

