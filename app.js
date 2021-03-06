// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

const express = require('express')
const port = 8000
const usersRouter = require('./routes/users');
const app = express()

// Koneksi Mongodb
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const myLogger = function (req, res, next) {
  req.time = new Date()
  next()
}
app.use(myLogger)
  
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/assets', express.static('public'))

app.get('/', (req, res) => {
  // console.log('Hello World')
  const kelas = {
    id : 1,
    nama: 'ExpressJs',
    date: req.time.toString()
  }
  res.render('pages/index', {kelas: kelas})
})

app.get('/about', (req, res) => {
  res.render('pages/about')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.use(usersRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})