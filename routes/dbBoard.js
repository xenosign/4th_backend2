// @ts-check
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const db = require('../controllers/boardController');

const router = express.Router();

const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now());
  },
});
const limits = {
  fileSize: 1024 * 1024 * 2,
};
const upload = multer({ storage, limits });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// 로그인 처리 함수
function isLogin(req, res, next) {
  console.log('session', req.session.login, 'cookie', req.signedCookies.user);
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(400);
    res.send(
      '로그인이 필요한 서비스 입니다.<br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
}

// dbBoard 메인 페이지
// locahost:4000/dbBoard
router.get('/', isLogin, async (req, res) => {
  const ARTICLE = await db.getAllArticles();
  const articleCounts = ARTICLE.length;
  res.render('dbBoard', {
    ARTICLE,
    articleCounts,
    userId: req.session.userId,
  });
});

// 모든 게시글 데이터를 받아오는 라우터
router.get('/getAll', (req, res) => {
  db.getAllArticles((data) => {
    res.send(data);
  });
});

// 게시글 쓰기 페이지 이동
router.get('/write', isLogin, (req, res) => {
  res.render('dbBoard_write');
});

// 게시글 추가
router.post('/write', isLogin, upload.single('img'), async (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
      IMAGE: req.file ? req.file.filename : null,
    };

    const writeResult = await db.writeArticle(newArticle);
    if (writeResult) {
      res.redirect('/dbBoard');
    } else {
      const err = new Error('DB에 글 추가 실패');
      throw err;
    }
  } else {
    const err = new Error('글 제목 또는 내용이 빠졌습니다.');
    throw err;
  }
});

// 게시글 수정 페이지로 이동
router.get('/modify/:id', isLogin, async (req, res) => {
  const findArticle = await db.getArticle(req.params.id);
  if (findArticle)
    res.render('dbBoard_modify', { selectedArticle: findArticle });
});

// 게시글 수정
router.post('/modify/:id', isLogin, upload.single('img'), async (req, res) => {
  try {
    if (req.body.title && req.body.content) {
      const modifyResult = await db.modifyArticle(
        req.params.id,
        req.body,
        req.file,
      );
      if (modifyResult) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('DB 글 내용 수정 실패');
        throw err;
      }
    } else {
      const err = new Error('글 제목 또는 내용이 빠졌습니다.');
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.send(`${err}<br><a href="/">메인 페이지로 이동</a>`);
  }
});

// 게시글 삭제
router.delete('/delete/:id', isLogin, async (req, res) => {
  if (req.params.id) {
    const deleteResult = await db.deleteArticle(req.params.id);
    if (deleteResult) {
      res.send('삭제 완료');
    } else {
      const err = new Error('글 삭제 실패');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('ID 파라미터 값이 없습니다!');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
