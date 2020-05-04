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

export function saveOrUpdateConfigFileInfo(params) {
  return request({
    url: '/saveOrUpdateConfigFileInfo',
    method: 'post',
    params
  })
}

export function getServerListByUserId(params) {
  return request({
    url: '/getServerListByUserId',
    method: 'get',
    params
  })
}

export function deleteConfigFileInfoById(params) {
  return request({
    url: '/deleteConfigFileInfoById',
    method: 'get',
    params
  })
}

export function getConfigFileContent(params) {
  return request({
    url: '/getConfigFileContent',
    method: 'get',
    params
  })
}

export function updateConfigFileContent(params) {
  return request({
    url: '/updateConfigFileContent',
    method: 'post',
    params
  })
}

export function getDnsInfoListByServerId(params) {
  return request({
    url: '/getDnsInfoListByServerId',
    method: 'get',
    params
  })
}

export function updateDnsInfoListByServerId(params) {
  return request({
    url: '/updateDnsInfoListByServerId',
    method: 'post',
    params
  })
}
