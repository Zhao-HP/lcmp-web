import request from '@/utils/request'

export function login(params) {
  return request('/getUserInfoByNameOrMail', {
    method: 'post',
    params
  }, "lcmp")
}

