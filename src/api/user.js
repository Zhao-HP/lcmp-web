import request from "../utils/request";

export function getUserInfo(query){
    return request("/getUserInfoByNameOrMail",query,'get')
}

export function getUserInfoById(query){
    return request("/getUserInfo",query,"get")
}