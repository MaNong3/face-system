import Axios from '../utils/axios'
import Qs from "qs"
//用户登录
export function userLogin(data) {
  return Axios.post('/userLogin', Qs.stringify(data));
}
//获取用户
export function getUserInfo(data) {
  return Axios.get('/getUserInfo');
}
//获取所有教室
export function getAllClass(data) {
  return Axios.get('/getAllClass');
}
//删除教室
export function deletClass(data) {
  return Axios.post('/deletClass', Qs.stringify(data));
}
//添加班级
export function addClass(data) {
  return Axios.post('/addClass', Qs.stringify(data));
}



//打卡上传
export function updateCard(data) {
  return Axios.post('/file/uploadCard',data);
}

//打卡存储
export function saveUploadCard(data) {
  return Axios.get('/saveUploadCard',data);
}
//获取面试
export function getInterview() {
  return Axios.get('/interview');
}
//面试反馈
export function setFeedback(data) {
  //console.log(data)
  return Axios.post('/setFeedback',Qs.stringify(data));
}

//上传
export function updateUrl(data) {
  console.log(data)
  return Axios.post('/file/upload', Qs.stringify(data));
}
//存储简历
export function getUrl(data) {
  console.log(data)
  return Axios.post('/upload', Qs.stringify(data));
}
//查看简历
export function lookResume() {
  return Axios.get('/lookResume');
}
//删除简历
export function delResume() {
  return Axios.get('/delResume');
}


//获取面试题分类
export function getExamType() {
  return Axios.get('/getExamType');
}
//添加面试题
export function addExam(data) {
  return Axios.post('/addExam', Qs.stringify(data));
}
//获取面试题
export function exam() {
  return Axios.get('/exam');
}

//删除面试题
export function deletExam(data) {
  return Axios.post('/deletexam', Qs.stringify(data));
}
