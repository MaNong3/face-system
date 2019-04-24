//生成从minNum到maxNum的随机数
 function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}
module.exports=function forCode(){
    let verificationCode=randomNum(100000,999999)
    return verificationCode
  }