const connect=require('../mysql/connect/index.js')
const bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const setToken=require('../mysql/setToken/index.js')
const getToken=require('../mysql/getToken/index.js')
const getName=require('../mysql/getName/index.js')
let multiparty = require('connect-multiparty');
let multipartyParse=multiparty()
 const fs=require('fs');
 const $path=require('path'); 
 const resolve=function(url){
   let currentPath=process.cwd()
   return $path.join(currentPath,url)
 }
 //登录
const userLogin=function(app){
    app.post('/userLogin',urlencodedParser,(req,res)=>{
        let {username,password}=req.body;
        console.log(req.body,123456)
        let $sql='select * from user where user_name=?'
        connect($sql,[username,password],function(result){
            if(result.length>0){
                if(result[0].user_pwd===password){
                     let token=getToken((result[0]))
                     setToken(result[0].user_name,token)
                     res.send({
                         code:0,
                         msg:'登陆成功',
                        data:result
                         
                     })
                }else{
                    res.send({
                        code:1,
                        msg:'密码错误'
                    })
                } 
            }else{
                getName(username,password,res) 
            }
        })
    })
}


//获取用户信息
const getUserInfo=function(app){
  app.get('/getUserInfo',(req,res)=>{
      const sql='select * from user ';
      connect(sql,[],function(result){
         console.log(result)
          console.log('获取成功');
          res.json({
              code:0,
              Msg:'获取成功',
              data:result
          })
      
      })
  })
}

const registerUser=function(app){
    app.post('/register',urlencodedParser,(req,res)=>{
        let {username,password}=req.body;
        const sql= 'INSERT INTO login(name,pwd) VALUES(?,?)';
        connect(sql,[username,password],function(result){
            console.log('匹配成功');
            res.json({
                code:0,
                Msg:'注册成功'
            })
        
        })
    })
}
//面试管理
const interview=function(app){
  app.get('/interview',(req,res)=>{
    let $sql='select * from interview';
    connect($sql,[],function(result){
      res.send({
        code:0,
        Msg:'获取成功',
        data:result[0]
      })
    })
  })
}
//----------------------------------------------面试题--------------------------------------
//获取面试题
const exam=function(app){
  app.get('/exam',(req,res)=>{
            const sql= 'select * from exam';
            connect(sql,[],function(result){
                console.log('试题获取成功');
                res.json({
                    code:0,
                    Msg:'试题获取成功',
                    data:result
                })
            })
  })
}

//获取面试题分类
const getExamType=function(app){
  app.get('/getExamType',(req,res)=>{
    console.log(11)
        const sql= 'select * from exam_type';
        connect(sql,[],function(result){
            console.log('匹配成功');
            res.json({
                code:0,
                Msg:'获取成功',
                data:result
            })
        
        })
  })
}


//添加面试题
const addExam=function(app){
  app.post('/addexam',urlencodedParser,(req,res)=>{
    let {exam_id,exam_name,exam_type,user_id,exam_answer}=req.body;
            const sql= 'INSERT INTO exam(exam_id,exam_name,exam_type,user_id,exam_answer) VALUES(?,?,?,?,?)';
            connect(sql,[exam_id,exam_name,exam_type,user_id,exam_answer],function(result){
                console.log('匹配成功');
                res.json({
                    code:0,
                    Msg:'注册成功'
                })
            })
  })
}

//修改面试题
const updataExam=function(app){
  app.post('/updataexam',urlencodedParser,(req,res)=>{
    let {exam_id,exam_name,exam_answer}=req.body;
            const sql= 'UPDATE exam SET exam_name = ?,exam_answer = ? WHERE exam_id = ?';
            connect(sql,[exam_id,exam_name,exam_answer],function(result){
                console.log('更新成功');
                res.json({
                    code:0,
                    Msg:'更新成功'
                })
            })
  })
}

//删除面试题
const deletExam=function(app){
  app.post('/deletexam',urlencodedParser,(req,res)=>{
    let {exam_id}=req.body;
            const sql= 'DELETE FROM exam WHERE exam_id = ?';
            connect(sql,[exam_id],function(result){
                console.log('删除成功');
                res.json({
                    code:0,
                    Msg:'删除成功'
                })
            })
  })
}

//-------------------------------------------------
//上传打卡

const updateCard = function(app) {
  app.post("/file/uploadCard",multipartyParse, (req,res) => {
   let {path,name}=req.files.file;
   let targetFile=$path.join('static/upload',name)
   let targetPath=resolve(targetFile)
   let sourceFile=fs.readFileSync(path)
   let error=fs.writeFileSync(targetPath,sourceFile)
   if(!error){
     res.send({
       code:0,
       file:path
    })
   }else{
     res.send({
       code:1,
       file:'上传失败'
    })
   }
   
  })
}

//打卡存储
const saveUploadCard=function(app){
  app.get('/saveUploadCard',(req,res)=>{
    console.log(res.query)
    let {user_id,user_identify,path}=req.query;
    let $sql=`INSERT INTO card(card_path,user_id,user_identify) VALUES(?,?,?)`;
    connect($sql,[path,user_id,user_identify],function(result){
      res.send({
        code:0,
        Msg:'打卡信息存储成功'
      })
    })
    
  })
}

//面试反馈
const setFeedback=function(app){
  app.post('/setFeedback',urlencodedParser,(req,res)=>{
    const {user_id,feed_context,company}=req.body;
    let $sql=`INSERT INTO feedback(user_id,feed_context,company) VALUES(?,?,?)`;
    connect($sql,[user_id,feed_context,company],function(result){
      res.send({
        code:0,
        Msg:'反馈成功'
      })
    })
  })
}

//----------------------------------------------------简历--------------------------------------------
 //上传简历
const updateUrl = function(app) {
  app.post("/file/upload",urlencodedParser, (req,res) => {
    console.log(req.body)
    let {jianli_id,jianli_name,jianli_content,jianli_type,jianli_time} = req.body;
    const sql= 'INSERT INTO jianli_list(jianli_id,jianli_name,jianli_content,jianli_type,jianli_time)VALUES(?,?,?,?,?)';
    connect(sql,[jianli_id,jianli_name,jianli_content,jianli_type,jianli_time],function(result){
        console.log('简历添加成功');
        res.json({
            code:0,
            Msg:'添加成功'
        })
    })
  })
}

//查看简历
const lookResume=function(app){
  app.get('/lookResume',(req,res)=>{
    const sql='select * from jianli_list';
    connect(sql,[],function(result){
      res.send({
        code:0,
        Msg:'获取简历成功',
        data:result
      })
    })
    
  })
}
//删除简历
const delResume=function(app){
  app.get('/delResume',(req,res)=>{
    
  })
}

//存储简历
const getUrl=function(app){
  app.post('/upload',(req,res)=>{
   // console.log(res.query)
    let {jianli_id,jianli_name,jianli_content}=req.body;
    let $sql='INSERT INTO jianli_list(jianli_id,jianli_name,jianli_content) VALUES(?,?,?)';
    connect($sql,[jianli_id,jianli_name,jianli_content],function(result){
      res.send({
        code:0,
        Msg:'简历存储成功'
      })
    })
    
  })
}

//-------------------------------------------班级----------------------------------------------
//获取所有教室
const getAllClass=function(app){
  app.get('/getAllClass',(req,res)=>{
      const sql='select * from room ';
      connect(sql,[],function(result){
          console.log('获取成功');
          res.json({
              code:0,
              Msg:'获取成功',
              data:result
          })
      
      })
  })
}
//添加班级
const addClass=function(app){
  app.post('/addClass',urlencodedParser,(req,res)=>{
    const {room_num,room_name,user_id, room_id,user_identify}=req.body
    const sql= 'INSERT INTO room(room_num,room_name,user_id,room_id,user_identify) VALUES(?,?,?,?,?)';
    connect(sql,[room_num,room_name,user_id,room_id,user_identify],function(result){
      console.log(result)
        res.json({
            code:0,
            Msg:'插入成功',
            data:result
        })
    
    })
  })
}

//删除班级
const deletClass=function(app){
  app.post('/deletClass',urlencodedParser,(req,res)=>{
            let {room_num,room_name,user_id,room_id,user_identify}=req.body;
            const sql= 'DELETE FROM room WHERE room_num = ? and room_name=? and user_id=? and room_id=? and user_identify=?';
            connect(sql,[room_num,room_name,user_id,room_id,user_identify],function(result){
                console.log('删除成功');
                res.json({
                    code:0,
                    Msg:'删除成功'
                })
            
            })
  })
}
module.exports=function(app){
    userLogin(app)
    addClass(app)
    addExam(app)
    getExamType(app)
    updataExam(app)
    deletExam(app)
    updateUrl(app)
    getUrl(app)
    lookResume(app)
    interview(app)
    getUserInfo(app)
    getAllClass(app)
    deletClass(app)
    exam(app)
    updateCard(app)
    saveUploadCard(app)
    setFeedback(app)

}