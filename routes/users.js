// @ts-check
const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'tetz',
    name: '이효석',
    email: 'tetz@spreatics.com',
  },
  {
    id: 'kimi',
    name: '이기원',
    email: 'tetz@spreatics.com',
  },
];

// EJS 사용 파트
// localhost:4000/users
router.get('/', (req, res) => {
  res.render('users', { USER, userCounts: USER.length });
});

// 유저 라우터, 전체 회원 목록 조회
router.get('/list', (req, res) => {
  res.send(USER);
});

// 특정 ID를 가진 회원 정보 조회
router.get('/id/:id', (req, res) => {
  const findUser = USER.find((user) => {
    console.log(user);
    return user.id === req.params.id;
  });

  if (findUser) {
    res.send(findUser);
  } else {
    res.send('ID를 못 찾았습니다!');
  }
});

// 새로운 회원 등록! => 작업
router.post('/', (req, res) => {
  if (req.query.id) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록 완료');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원 등록 완료');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

// 회원 수정을 하는 API => 작업
router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
    if (findUserIndex !== -1) {
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[findUserIndex] = modifyUser;
      res.send('회원 정보 수정 완료!');
    } else {
      res.send('ID를 찾을 수 없습니다!');
    }
  } else {
    console.log('Unexpected Query!');
  }
});

// 회원 삭제 API
router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  const findUserIndex = USER.findIndex((user) => user.id === req.params.id);
  console.log(findUserIndex);
  if (findUserIndex !== -1) {
    USER.splice(findUserIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    res.send('해당 ID를 찾을 수 없습니다!');
  }
});

module.exports = router;
