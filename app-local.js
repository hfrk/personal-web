var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var echoRouter = require('./routes/echo');
var secretRouter = require('./routes/secret');
var testRouter = require('./routes/test');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/echo', echoRouter);
app.use('/secret', secretRouter);
app.use('/test', testRouter);
app.use('/blog', blogRouter);
app.use('/canvas', function(req, res, next) {
    res.status(200);
    res.sendFile(path.join(__dirname, 'public/canvas.html'));
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
  res.render('pages/error', (err, content) => {
      res.render('pages/layout', { title: `Error`, content: content });
  });
});

app.listen(8080);

module.exports = app;
