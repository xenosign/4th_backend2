// @ts-check
const express = require('express');
const db = require('../controllers/boardController');

const router = express.Router();

// dbBoard 메인 페이지
// locahost:4000/dbBoard
router.get('/', (req, res) => {
  db.getAllArticles((data) => {
    console.log(data);
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('dbBoard', { ARTICLE, articleCounts });
  });
});

// 모든 게시글 데이터를 받아오는 라우터
router.get('/getAll', (req, res) => {
  db.getAllArticles((data) => {
    res.send(data);
  });
});

// 게시글 쓰기 페이지 이동
router.get('/write', (req, res) => {
  res.render('dbBoard_write');
});

// 게시글 추가
router.post('/write', (req, res) => {
  if (req.body.title && req.body.content) {
    db.writeArticle(req.body, (data) => {
      if (data.protocol41) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('DB에 글 추가 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 빠졌습니다.');
    throw err;
  }
});

// 게시글 수정 페이지로 이동
router.get('/modify/:id', (req, res) => {
  db.getArticle(req.params.id, (data) => {
    console.log(data);
    if (data.length > 0) {
      res.render('dbBoard_modify', { selectedArticle: data[0] });
    }
  });
});

// 게시글 수정
router.post('/modify/:id', (req, res) => {
  if (req.body.title && req.body.content) {
    db.modifyArticle(req.params.id, req.body, (data) => {
      if (data.protocol41) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('DB 글 내용 수정 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 빠졌습니다.');
    throw err;
  }
});

// 게시글 삭제
router.delete('/delete/:id', (req, res) => {
  if (req.params.id) {
    db.deleteArticle(req.params.id, (data) => {
      console.log(data);
      if (data.protocol41) {
        res.send('삭제 완료');
      } else {
        const err = new Error('글 삭제 실패');
        err.statusCode = 404;
        throw err;
      }
    });
  } else {
    const err = new Error('ID 파라미터 값이 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
