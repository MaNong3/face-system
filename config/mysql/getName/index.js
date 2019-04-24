const setToken=require('../setToken/index.js')
const getToken=require('../getToken/index.js')
const connect=require('../connect/index.js');

module.exports=function getName(username,password,res){
    //console.log(username,password)
     let $sql='select * from user where user_pwd=?';
    connect($sql,[password],function(result){
        if(result.length>0){
            if(result[0].user_name===username){
                let token=getToken((result[0]))
                setToken(result[0].id,token)
                res.send({
                    code:0,
                    msg:'登陆成功',
                    token:token,
                    islogin:true
                })
            }else{
                res.send({
                    code:2,
                    msg:'账号错误'
                })
            }  
        }else{
            res.send({
                code:3,
                msg:'账号不存在'
            })  
        }
    })
}