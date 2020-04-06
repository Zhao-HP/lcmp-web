import request from "../utils/request";

export function getServerInfoByUid(params) {
  return request("/getServerInfoByUid", {
    method: 'post',
    params
  }, 'lcmp')
}

export function getServerUsageInfo(params) {
  return request('/getServerUsageInfo', {
    method: 'post',
    params
  }, 'lcmp')
}

export function saveOrUpdateServerInfoById(params) {
  return request("/saveOrUpdateServerInfoById", {
    method: 'post',
    params
  }, 'lcmp')
}

export function getApplicationList(params) {
  return request("/getApplicationList",{
    method:'post',
    params
  }, 'lcmp')
}

export function installedApplication(params) {
  return request("/installedApplication", {
    method: 'post',
    params
  }, 'lcmp')
}

export function updateApplication(params) {
  return request("/updateApplication",{
    method:'post',
    params
  }, 'lcmp')
}

export function removeApplication(params) {
  return request("/removeApplication", {
    method:'post',
    params
  }, 'lcmp')

}
