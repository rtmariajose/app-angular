const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'ERROR viene de otro lado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const connection = mysql.createConnection({
  host:'localhost',
  user:'mrioseco',
  password:'12345',
  database:'myDB'
});

connection.connect((err) =>{
  if(err) throw err;
  console.log("conectado a la base de datos MYSQL");
});
app.get('/usuario_login',(req,res) =>{
  const sql = "select * from usuario_login";
connection.query(sql,(err,result) =>{
  if(err) throw  err;
  res.send(result);
});
});

app.get('/saldos',(req,res) =>{
  const sql = "select * from saldos";
  connection.query(sql,(err,result) =>{
    if(err) throw  err;
    res.send(result);
  });
});

app.listen(port,()=>{
  console.log("Servidor express escuchando en el puerto ${port}");
})
