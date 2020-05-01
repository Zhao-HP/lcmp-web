import request from '@/utils/request'

export function login(params) {
  return request({
    url:'/getUserInfoByNameOrMail',
    method: 'post',
    params
  })
}

