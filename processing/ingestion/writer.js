require('dotenv').config();
const process = require('process');
const mysql      = require('mysql');

let connection; 

function init() {
  connection = mysql.createConnection({
    host     : process.env.COVID19_DB_HOST || 'localhost',
    user     : process.env.COVID19_DB_USER,
    password : process.env.COVID19_DB_PWD,
    database : process.env.COVID19_DB || 'ioconto'
  });
  connection.connect();
}

function write(data) {
  return new Promise((resolve, reject) => {
    //connection.connect();
    let sql = 'INSERT INTO `it-municipalities-daily-deaths` (`regId`, `provId`, `region`, `province`, `name`, `istatId`, `ageClass`, `dayS`, `day`, `month`, `m15`, `m16`, `m17`, `m18`, `m19`, `m20`, `f15`, `f16`, `f17`, `f18`, `f19`, `f20`, `t15`, `t16`, `t17`, `t18`, `t19`, `t20`) VALUES ';
    sql += `(1, 1, 'Piemonte', 'Torino', 'Agliè', 1001, 17, '0102', 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0);`;
    connection.query(sql, function (error, results, fields) {
      if (error)  {
        reject(error);
      } else {
        resolve();
      }
    });
  
  });
}

function stop() {
  connection.end();
}

module.exports = {
  init,
  stop,
  write
}