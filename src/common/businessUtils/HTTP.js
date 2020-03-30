
import axios from 'axios';

// 全局的 axios 默认值
// axios.defaults.baseURL = HostURL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN+'';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 添加请求拦截器
axios.interceptors.request.use((config) => {
    const data = JSON.stringify(config.data);
   // console.log(`#请求拦截器：[${config.method}] ${config.url} ,para=${data}`);
    // 在发送请求之前做些什么
    return config;
}, (error) => {
  // 对请求错误做些什么
  console.log(`#请求错误：${error}`);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // console.log("999");
  // console.log(response)
  if (response.data && response.data.resultCode !== 200) {
    if (global.globalHttpErrorHandler) {
      global.globalHttpErrorHandler.handleResultCodeError(response.data.resultCode, response.data);
    }
  }
  return response;
}, (error) => {
  // 对响应错误做点什么
  console.log(`#响应错误：${error}`);
  // 如果有了 自定义的全局http错误处理类，则交给它处理
  if (global.globalHttpErrorHandler) {
    global.globalHttpErrorHandler.handleHttpError(error);
  }
  return Promise.reject(error);
});

const $HTTP = axios;// createInstance();

// console.log('# $HTTP axios 模块加载完成.');

export default $HTTP;
