import request from "../utils/request";

export function getUserInfo(query){
    return request("/getUserInfoByNameOrMail",query,'post')
}