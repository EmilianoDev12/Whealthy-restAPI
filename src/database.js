const mysql = require('mysql');
var con = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bc195cc2c891dc',
    password: '57c9aba9',
    database: 'heroku_0e1938de3971091'
}); 
con.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
      }
    }
  
    if (connection) connection.release();
    console.log('DB is Connected');
  
    return;
    });
module.exports = con;

//host: 'us-cdbr-east-04.cleardb.com',
//user: 'b9b78c2d3a36e7',
//password: '7ddbde8b',
//database: 'heroku_26f360dc3e94e97'