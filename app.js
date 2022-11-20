// @ts-check
const express = require('express');

const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);
app.use('/board', boardRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}번에서 실행 중입니다!`);
});
