import request from "../utils/request";

export function getServerInfoByUid(query){
    return request("/getServerInfoByUid",query, 'post')
}