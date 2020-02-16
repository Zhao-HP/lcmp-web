import axios from 'axios'
import qs from 'qs'

const proxy = '/path';
const Axios = axios.create({
    timeout: 10000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    traditional: true,
    headers: {
        'traditional':true
    }
});

/**
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
function get(url, params) {
    return new Promise((resolve, reject) => {
        Axios.get(proxy+url, {
            params: params
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(proxy+url, qs.stringify(params))
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err.data)
            })
    })
}

const request = (url, params = {},type) => {
    if(type==='get'){
        return get(url,params);
    }else{
        return post(url,params);
    }
};

export default request
