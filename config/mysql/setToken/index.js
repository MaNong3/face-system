
const connect=require('../connect/index.js');


module.exports=function setToken(name,token){
  let $sql=`UPDATE user set user_token=? where user_name=?`;
  connect($sql,[token,name],function(result){
      console.log('token数据更新成功')
  })
  }