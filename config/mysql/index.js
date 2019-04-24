const mysql = require('mysql');
// 使用连接池去连接服务器
const pool = mysql.createPool({
  host: '127.0.0.1',
  port:'3306',
  user: 'root',
  password : '123321',
  database : 'student'
})

module.exports=pool;

