import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/adminCommon/upload',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}
