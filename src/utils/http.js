/**
 * axios封装：请求拦截，响应拦截，错误编码
 */
import axios from 'axios';
import qs from 'qs'
import {Message} from 'element-ui'

const Axios = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    responseType: 'json',
    withCredentials: false, // 是否允许带cookie这些
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

const baseUrl = "https://127.0.0.1:8089"
/**
 * 请求拦截器
 */
Axios.interceptors.request.use(
    config => {
        // 序列化，如果后台接口可以直接接受json 格式,可以不用 qs 序列化
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        Message({
            showClose: true,
            message: error && error.data.message,
            type: 'error'
        });
        return Promise.reject(error.data.message)
    }
);

// 响应拦截器
Axios.interceptors.response.use(
    response => {
        if (response && response.status === 200) {

        }
        return response
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    Message({
                        showClose: true,
                        message: '401',
                        type: 'error'
                    });
                    break;
                case 403:
                    Message({
                        showClose: true,
                        message: '403错误',
                        type: 'error'
                    });
                    break;
                case 404:
                    Message({
                        showClose: true,
                        message: '404错误',
                        type: 'error'
                    });
                    break;
                case 500:
                    Message({
                        showClose: true,
                        message: '500错误',
                        type: 'error'
                    });
                    break;
                case 502:
                    Message({
                        showClose: true,
                        message: '502错误',
                        type: 'error'
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        showClose: true,
                        message: error,
                        type: 'error'
                    })
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        Axios.get(baseUrl + url, {
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
export function post(url, param = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(baseUrl + url, param)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err.data)
            })
    })
}
