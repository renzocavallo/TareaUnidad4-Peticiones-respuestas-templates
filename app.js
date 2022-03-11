var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const req = require('express/lib/request');
const res = require('express/lib/response');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var salirRouter = require('./routes/salir');
var anotacionesRouter = require('./routes/mensaje');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'JHiM4LpIVE00890',
  resave: false,
  saveUninitialized: true
}));


app.get('/',function(req,res){
  var mensaje = Boolean(req.session.anotacion)

  res.render('index', {
  title: 'Escribe un mensaje',
  mensaje : mensaje,
  nuevoMensaje: req.session.anotacion
})

})

app.post('/mensaje',function(req,res){
  if(req.body.anotacion){
    req.session.anotacion = req.body.anotacion
  }
  var mensaje = Boolean(req.session.anotacion)
  res.render('mensaje',{
    mensaje: mensaje,
    nuevoMensaje:req.session.anotacion
  })

})

app.get('/salir',function(req,res){
  req.session.destroy()
  res.render('salir')
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/salir', salirRouter);
app.use('/mesaje',anotacionesRouter);

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

module.exports = app;
