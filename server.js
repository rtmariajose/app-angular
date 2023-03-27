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

  let status;
  let mensaje = "";
  const email = req.query.email;
  const pass = req.query.password;
  const sql = 'select id from usuario_login  where email = ? and password= ?';
  connection.query(sql,[email,pass],(err,result) =>{
    if(err) throw  err;
    let id_usuario = null;
    if(result.length > 0)
      id_usuario = result[0].id;

    if(id_usuario != null && id_usuario != ""){
      const datos = {
        usuario_login_id: id_usuario
      };
      connection.query('INSERT INTO usuario_log SET ?', datos,
        function (error, results, fields) {
        if (error) throw error;
        status =  (results.affectedRows >= 1 ) ? true : false;
        mensaje = (results.affectedRows >= 1 ) ? "Se registro el proceso correctamente" :
          "Hubo un error al insertar el log de usuario";
          let response = {
            "status": status,
            "mensaje": mensaje
          };
          res.send(response);
      });
    }else{
        status =  false;
        mensaje =  "No existe el usuario";
      let response = {
        "status": status,
        "mensaje": mensaje
      };
      res.send(response);

    }




  });
});

app.get('/saldos',(req,res) =>{
  // Paginación
  const start = Number(req.query.start);
  const length = Number(req.query.length);
  const order = req.query.order[0];
  const column = order.column;
  const dir = order.dir;

  const sql_total = 'select * from saldos';
  connection.query(sql_total,(err,result2) =>{
    total_max_registros = result2.length;
    const sql = 'select * from saldos LIMIT ?,?';
    connection.query(sql,[start,length],(err,result) =>{
      if(err) throw  err;
      total_registros = result.length;
      // Devolver los datos al DataTable
      const response = {
        "draw": req.query.draw,
        "recordsTotal": total_max_registros,
        "recordsFiltered": total_registros,
        "data": result
      };
      res.send(response);
    });

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
  const sql = 'select us.email,DATE_FORMAT(LOG.fecha_registro, \'%Y-%m-%d %T\') as fecha_registro from usuario_log LOG\n' +
    'INNER JOIN usuario_login us ON LOG.usuario_login_id = us.id\n' +
    '  where us.email = ? LIMIT ?,?';
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
