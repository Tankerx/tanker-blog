import { Loading, Message } from 'element-ui'
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.1.104:7001';
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8'
}
axios.defaults.timeout=10000
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Message.success('开始请求')
   Loading.service()
  return config;
}, function (error) {
  // Do something with request error
  let loadingInstance1 = Loading.service()
  loadingInstance1.close()
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
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
  Message.error(error)
  return Promise.reject(error);
});
export default axios
