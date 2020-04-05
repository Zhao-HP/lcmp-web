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

