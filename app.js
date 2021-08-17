let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');

let indexRouter = require('./routes/index');
let echoRouter = require('./routes/echo');
let secretRouter = require('./routes/secret');
let testRouter = require('./routes/test');
let blogRouter = require('./routes/blog');

let app = express();

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
app.use('/canvas', async (req, res, next) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'public/canvas.html'));
});
app.get('/jadwalkuliah', function(req, res, next) {
    res.status(200);
    res.sendFile(path.join(__dirname, 'not_public/jadwalkuliah.json'));
});
app.post('/jadwalkuliah', express.json(), async (req, res) => {
    if (req.get("Authorization") === process.env.AUTH_JADWAL){
        fs.writeFile(path.join(__dirname, 'not_public/jadwalkuliah.json'), JSON.stringify(req.body, null, 4), (err) => {
            if (err) {
                res.sendStatus(400);
            }
            else {
                console.log("JSON data is saved.");
            }
        });
        res.sendStatus(200);
    }
    else {
        res.sendStatus(403);
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
  res.render('pages/error', (err, content) => {
      res.render('pages/layout', { title: `Error`, content: content });
  });
});

module.exports = app;
