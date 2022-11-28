// @ts-check
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

const app = express();
const { PORT } = process.env;

const indexRouter = require('./routes');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const dataRouter = require('./routes/data');
const dbBoardRouter = require('./routes/dbBoard');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');

app.use(cookieParser('tetz'));
app.use(
  session({
    secret: 'tetz',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/board', boardRouter);
app.use('/data', dataRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다!`);
});
