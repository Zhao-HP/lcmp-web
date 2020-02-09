import axios from 'axios'

const proxy = '/path';


const Axios = axios.create({
    timeout: 10000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
 * @param {Object} param [请求时携带的参数]
 */
function post(url, param = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(proxy+url, param)
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
