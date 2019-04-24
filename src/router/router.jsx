import Home from 'view/home'
import Login from 'view/login'
import AddClass from 'comp/addClass'
import LookClass from 'comp/lookClass'
import ShowUser from 'comp/showUser'//展示用户
import Interview from 'view/home/interview' //面试管理
import Invitation from 'view/home/interview/invitation' //邀约面试
import Card from 'view/home/interview/card' //面试打卡
import Company from 'view/home/interview/company' //面试公司
import Feedback from 'view/home/interview/feedback' //面试公司
import ResumeUpload from 'comp/resumeUpload'//简历上传
import ResumeList from 'comp/resumeList'//简历列表
import Establish from 'comp/establish'//
import Establishtype from 'comp/establishtype'
const Routers=[
   { mode:'history'},
    {
        auth: true,
        path:'/home',
        component:Home,
       
        children:[{
            path:'/home/addclass',
            component:AddClass,
        },{
            path:'/home/lookclass',
            component:LookClass,
        },{
            path:'/home/showUser',
            component:ShowUser,
        },{
            path:'/home/interview',
            component:Interview,
            title:'面试管理',
        },  {
            path:'/home/invitation',
            component:Invitation,
            title:'面试邀约'
        },
        {
            path:'/home/card',
            component:Card,
            title:'面试打卡'
        },
        {
            path:'/home/company',
            component:Company,
            title:'面试公司'
        },
        {
            path:'/home/feedback',
            component:Feedback,
            title:'面试反馈'
        }, {
                path:'/home/addclass',
                component:AddClass,
            },{
                path:'/home/lookclass',
                component:LookClass,
            },
            {
                path:'/home/resumeUpload',
                component:ResumeUpload,
                title:'上传简历'
            },{
                path:'/home/resumeList',
                component:ResumeList,
                title:'查看简历'
            },{
                path:'/home/establish',
                component:Establish
            },
            {
                path:'/home/establishtype',
                component:Establishtype
            }
    ],
        title:'首页'
    },
    {
        path:'/login',
        component:Login,
      
        title:'登录',
    }
]


export default Routers;



// const groups = {
//     QUESTIONSMANGER:{
//         groupName:'试题管理',groupIcon:'user'
//     },
//     USERMANGER:{
//         groupName:'用户管理',groupIcon:'user'
//     },
//     INTERVIEWMANGER:{
//         groupName:'面试管理',groupIcon:'user'
//     },
//     GRADEMANGER:{
//         groupName:'班级管理',groupIcon:'user'
//     },
//    RESUMEMANGER:{
//         groupName:'简历管理',groupIcon:'user'
//     }
// }

// const Routes = [{
//     path: "/home",
//     component: Home,
//     title:"首页",
//     children: [{
//         path: "/home/room",
//         title:"添加班级",
//         groupName:groups.GRADEMANGER.groupName,
//         component: Room
//     }, {
//         path: "/home/feedback",
//         title:"面试反馈",
//         groupName:groups.INTERVIEWMANGER.groupName,
//         component: Feedback,
//     }, {
//         path: "/home/invitation",
//         title:"邀约面试",
//         groupName:groups.INTERVIEWMANGER.groupName,
//         component: Invitation,
//     }, {
//         path: "/home/punch",
//         groupName:groups.INTERVIEWMANGER.groupName,
//         title:"面试打卡",
//         component: Punch,
//     }, {
//         path: "/home/addUser",
//         groupName:groups.USERMANGER.groupName,
//         title:"添加用户",
//         component: AddUser
//     }, {
//         path: "/home/addresume",
//         title:"上传简历",
//         groupName:groups.RESUMEMANGER.groupName,
//         component: Resume
//     }, {
//         path: "/home/editresume",
//         title:"编辑简历",
//         groupName:groups.RESUMEMANGER.groupName,
//         component: EditResume
//     }, {
//         path: "/home/lookresume",
//         title:"查看简历",
//         groupName:groups.RESUMEMANGER.groupName,
//         component: Lookresume
//     },{
//         path: "/home/examClass",
//         title:"试题分类",
//         groupName:groups.QUESTIONSMANGER.groupName,
//         component: ExamClass
//     },{
//         path: "/home/createExam",
//         title:"创建试题",
//         groupName:groups.QUESTIONSMANGER.groupName,
//         component: CreateExam
//     },{
//         path: "/home/examManger",
//         title:"管理试题",
//         groupName:groups.QUESTIONSMANGER.groupName,
//         component: ExamManger
//     }]
// }, {
//     path: "/login",
//     title:"登录",
//     component: Login
// }]


