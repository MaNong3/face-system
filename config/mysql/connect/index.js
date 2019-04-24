const pool=require('../index.js')

module.exports=function connect(sql,opt,cb) {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log('与mysql数据库建立连接失败');
      } else {
        connection.query(sql,opt,function(err, result) {
          if (err) {
            console.log('数据处理失败', err);
          } else {
            console.log('数据处理成功');
            connection.release();
            cb(result)
          }
        })
      }
    })
    //处理数据库服务器连接中断时的操作
    pool.on('error', function(err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('与mysql数据库之间的连接丢失');
        //3秒后重新尝试连接数据库
        setTimeout(function() {
          connect();
        }, 3000);
      } else {
        throw err;
      }
    })
  }
  