import request from '../utils/request'

export function getConfigFileInfoListByUserIdAndServerId(params) {
  return request({
    url: '/getConfigFileInfoListByUserIdAndServerId',
    method: 'get',
    params
  })
}

export function getConfigFileListByPage(params) {
  return request({
    url: '/getConfigFileListByPage',
    method: 'get',
    params
  })
}
