// @ts-check
const express = require('express');
const db = require('../controllers/userController');

const router = express.Router();

// 회원 가입 페이지
router.get('/', (req, res) => {
  res.render('register');
});

// 회원 가입 처리
router.post('/', (req, res) => {
  db.userCheck(req.body.id, (data) => {
    if (data.length === 0) {
      db.registerUser(req.body, (result) => {
        if (result.protocol41) {
          res.send(
            '회원 가입 성공!<br><a href="/login">로그인 페이지로 이동</a>',
          );
        } else {
          res.status(400);
          res.send(
            '회원 가입 문제 발생!<br><a href="/register">회원 가입 페이지로 이동</a>',
          );
        }
      });
    } else {
      res.status(400);
      res.send(
        '중복된 회원 ID가 존재 합니다.<br><a href="/register">회원 가입 페이지로 이동</a>',
      );
    }
  });
});

module.exports = router;
