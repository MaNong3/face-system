import axios from 'axios';
import {message} from 'antd'
import codeMessage from "./status.js"
let token=sessionStorage.getItem('token')

//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (token) {  // 判断是否存在token，如果存在的话，则每个http headers都加上token
            config.headers.authorization= `${token}`;
        }else{
            message.error('请先登陆')
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    })

// http response 拦截器
axios.interceptors.response.use(
    response=>{
       if(response.status !== 200 ) return message.success('返回数据失败')
        return Promise.resolve(response);
    },error => {
        if (error.response) {
            message.error(codeMessage[error.response.status])
        }
        return Promise.reject(error);
    })
export default axios;
// let axiosPreURl = "http://localhost:3000/";//配置全局的代理
// axios.interceptors.request.use(config=>{//config包含每次请求的内容
//     if (token) {  // 判断是否存在token，如果存在的话，则每个http headers都加上token
//         config.headers.authorization= `${token}`;
//     }else{
//         message.error('请先登陆')
//     }
//     return config;
// },err=>{
//     return Promise.reject(err);
// });
// axios.interceptors.response.use(response=>{
//     return response
// },error => {
//     return Promise.resolve(error.response)
//     });

// function checkStatus (response) {//检查状态码的方法
//     if (response && (response.status == 200 || response.status == 304 || response.status == 400)){
//         return response;
//     }
//     return {
//         status:-404,
//         msg:'网络异常'
//     }
// }
// function checkCode(response) {//如果失败，弹出错误信息
//     if (response.status === -404){
//         alert(response.msg);
//     }
//     return response;
// }

// export default {
//     post(url, data) {
//         return axios({
//             method:'post',
//             baseURL: axiosPreURl,
//             url,
//             data:Qs.stringify(data),//序列化
//             timeout:5000,
//             headers:{
//                 'X-Requested-With':'XMLHttpRequest',
//                 'Content-Type': 'application/x-www-form-=urlencoded;charset=UTF-8',
//             }
                
//         }).then(
//             (response) => {//不管成功还是失败都会有这两次的过滤，筛选错误信息
//                 return checkStatus(response)
//             }
//             ).then(
//             (res) => {//如果失败
//                 return checkCode(res)
//             }
//             )
//     },
//     get(url,params){
//         return axios({
//             method:'get',
//             baseURL:axiosPreURl,
//             url: url,
//             params,
//             timeout:5000,
//             headers:{
//                 'x-Requested-With':'XMLHttpRequest'
//             }
//         }).then(
//             (response) =>{
//                 return checkStatus(response);
//             }
//         ).then(
//             (res)=>{
//                 return checkCode(res)
//             }
//         )
//     }
// }




