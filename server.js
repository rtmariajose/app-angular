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
/**
 * Servicio que permite realizar la validacion del usuario mas el logg del usuario
 */
app.get('/usuario_login',(req,res) =>{
  //se debe consultar por el email y pass
  const email = req.query.email;
  const pass = req.query.password;
  console.log("Datos"+email+ " -- "+pass);
  const sql = 'select id from usuario_login  where email = ? and password= ?';
  connection.query(sql,[email,pass],(err,result) =>{
    if(err) throw  err;
    console.log(result);
    let id_usuario = result[0].id;

  const datos = {
      usuario_login_id: id_usuario
    };
    connection.query('INSERT INTO usuario_log SET ?', datos, function (error, results, fields) {
      if (error) throw error;
        console.log('Registro insertado con éxito');
      res.send(results);
    });

  });
});

app.get('/saldos',(req,res) =>{
  // Paginación
  const start = Number(req.query.start);
  const length = Number(req.query.length);
  const order = req.query.order[0];
  const column = order.column;
  const dir = order.dir;
  const sql = 'select * from saldos LIMIT ?,?';
  connection.query(sql,[start,length],(err,result) =>{
    if(err) throw  err;
    total_registros = result.length;
    // Devolver los datos al DataTable
    const response = {
      "draw": req.query.draw,
      "recordsTotal": total_registros,
      "recordsFiltered": total_registros,
      "data": result
    };
    res.send(response);
  });
});
/**
 * Permite conocer los log del usuario que se logea en una tabla
 */
app.get('/log_usuario',(req,res) =>{
  // Paginación
  const start = Number(req.query.start);
  const length = Number(req.query.length);
  const order = req.query.order[0];
  const column = order.column;
  const dir = order.dir;
  const email = req.query.usuario;
  const sql = 'select * from usuario_log  where email = ? LIMIT ?,?';
  connection.query(sql,[email,start,length],(err,result) =>{
    if(err) throw  err;
    total_registros = result.length;
    // Devolver los datos al DataTable
    const response = {
      "draw": req.query.draw,
      "recordsTotal": total_registros,
      "recordsFiltered": total_registros,
      "data": result
    };
    res.send(response);
  });
});

app.listen(port,()=>{
  console.log("Servidor express escuchando en el puerto ${port}");
})
