const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const con = require('./database');
const cors = require('cors');
const app = express();
const {Server} = require('socket.io');
const request = require('request');

const rooms = {};

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));

// Routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/citas',require('./routes/citas'));
app.use('/api/recetas', require('./routes/recetas'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.post("/agendar", (req, res) => {
  const playload = req.body;
  const config = {
    token:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlZpZU5xNW9BUkxtTGgtTVRfeFdFaWciLCJleHAiOjE2NTUwOTY0NTUsImlhdCI6MTY1NDQ5MTY1NX0.6cNfucAqCBnB0NNhqb91nWmvenO6fBo5QJ51StfaIoU",
    email: "gcasillasa1900@alumno.ipn.mx",
  };
  try {
    var options = {
      url: `https://api.zoom.us/v2/users/${config.email}/meetings`,
      method: "POST",
      auth: {
        bearer: config.token,
      },
      json: true,
      body: {
        start_time: playload.date,
        duration: playload.duration,
        topic: playload.topic,
        timezone: playload.timezone,
        type: 2,
      },
    };
    request(options, (error, response, body) => {
      console.log(response.statusCode);
      if (!error && response.statusCode === 201) {
        res.send({response});
      } else {
        console.log(body);
        res.send({ message: body.message });
      }
    });
  } catch (e) {
    console.log("a")
    res.status(500).send(e.toString());
  }
}); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Iniciar el servidor
const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

//Configuración de los sockets
const io = new Server(server, {
  origin: '*',
  methods: ["GET","POST"]
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on('conectar',(nombre, sala) => {
    console.log(nombre, sala);
    socket.join(sala);
  });

  socket.on('mensaje',(nombre, sala, mensaje) => {
    io.to(sala).emit('mensajes',{nombre,mensaje});
  });
});


module.exports = app;