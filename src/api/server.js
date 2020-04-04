import request from "../utils/request";

export function getServerInfoByUid(params) {
  return request("/getServerInfoByUid", {
    method: 'post',
    params
  }, 'lcmp')
}

export function getDiskInfo(params) {
  return request('/getDiskInfo', {
    method: 'post',
    params
  }, 'lcmp')
}
