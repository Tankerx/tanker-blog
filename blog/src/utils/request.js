import { Loading, Message } from 'element-ui'
import axios from 'axios';
var instance = axios.create({
    baseURL: 'http://192.168.1.104:7001',
    // baseURL: 'http://120.77.203.62:8855/tunnel/check/web',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    timeout: 10000
})
// axios.defaults.baseURL = 'http://192.168.1.104:7001';
// axios.defaults.headers = {
//   'Content-Type': 'application/json;charset=utf-8'
// }
// axios.defaults.timeout=10000
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Message.success('开始请求')
   Loading.service()
  return config;
}, function (error) {
  console.log(123)
  // Do something with request error
  let loadingInstance1 = Loading.service()
  loadingInstance1.close()
    console.log(error)
  return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
  // Do something with response data
  let loadingInstance1 = Loading.service()
  loadingInstance1.close()
  if(response.data.code==0){
    if(response.data.msg){
      Message.success(response.data.msg)
    }
    return response.data;
  }else{
    Message.error(response.data.msg)
    return Promise.reject('内部错误')
  }
}, function (error) {
  // Do something with response error
  let loadingInstance1 = Loading.service()
  loadingInstance1.close()
    console.log(error)
    if(error.code === undefined){
      Message.error('请求失败')
    }else if(error.code == "ECONNABORTED"){
      Message.error('请求超时，请检查网络连接，重新尝试！')
    }else {
        Message.error('服务器错误')
    }
    return Promise.reject(error);
});
export default instance
