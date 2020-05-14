import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import storageUtil from "./storageUtil";

const service = axios.create({
  withCredentials: true,
  timeout: 50000
});

// request interceptor
service.interceptors.request.use(
  config => {
    const serverId = storageUtil.readData("serverId");
    if (serverId){
      config.headers['serverId'] = serverId;
    }
    const userInfo = storageUtil.readData("userInfo");
    if (userInfo != null){
      config.headers['userId'] = userInfo.id
    }
    config.url = process.env.VUE_APP_BASE_API + config.url
    return config
  },
  error => {
    console.log(error);
    return Promise.reject(error)
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service
