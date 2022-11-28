// @ts-check
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { popup: req.cookies.popup });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('쿠기 생성 성공!');
});

router.get('/cookie', (req, res) => {
  res.cookie('cookie', true, {
    maxAge: 1000 * 60,
    httpOnly: false,
  });
  res.clearCookie('cookie');
  res.send('쿠키 굽기 성공!');
});

module.exports = router;
