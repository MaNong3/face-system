module.exports=function getToken(results){
    const md5=require('md5');
    let {id,username,password}=results
    let timer=new Date().getTime();
    let tmp={
      id:id,
      name:username,
      pwd:password,
      timer:timer
    }
    return md5(JSON.stringify(tmp))
  }