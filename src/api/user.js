import request from '@/utils/request'

export function login(params) {
  return request({
    url:'/getUserInfoByNameOrMail',
    method: 'post',
    params
  })
}

export function userRegister(params) {
  return request({
    url:'/userRegister',
    method:'post',
    params
  })
}
