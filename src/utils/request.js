import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {getBaseURL} from './base-url-config'
import storageUtil from "./storageUtil";

const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    const serverId = storageUtil.readData("serverId");
    if (serverId){
      config.params.serverId = serverId
    }
    return config
  },
  error => {
    console.log(error);
    return Promise.reject(error)
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
);

const request = (url, config = {}, baseOriginal) => {
  if (config.formData) {
    Object.assign(config, {
      transformRequest: [
        function (data) {
          let ret = '';
          for (let it in data) {
            if (data.hasOwnProperty(it)) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
          }
          return ret;
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  return service({
    url: config.raw ? url : getBaseURL(baseOriginal) + url,
    ...config
  });
};

export default request
