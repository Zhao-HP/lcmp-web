import request from "@/utils/request";

export function getServerInfoByUid(params) {
  return request({
    url:"/getServerInfoByUid",
    method: 'post',
    params
  })
}

export function getServerUsageInfo(params) {
  return request({
    url:'/getServerUsageInfo',
    method: 'post',
    params
  })
}

export function saveOrUpdateServerInfoById(params) {
  return request({
    url:"/saveOrUpdateServerInfoById",
    method: 'post',
    params
  })
}

export function getApplicationList(params) {
  return request({
    url: "/getApplicationList",
    method:'post',
    params
  })
}

export function installedApplication(params) {
  return request({
    url:"/installedApplication",
    method: 'post',
    params
  })
}

export function updateApplication(params) {
  return request({
    url:"/updateApplication",
    method:'post',
    params
  })
}

export function removeApplication(params) {
  return request({
    url:"/removeApplication",
    method:'post',
    params
  })

}
