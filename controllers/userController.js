// @ts-check
const connect = require('./mongooseConnect');

const User = require('../models/user');

connect();

const db = {
  // 유저 중복 체크
  userCheck: async (userId) => {
    try {
      const findUser = await User.findOne({ id: userId });
      if (!findUser) return false;
      return findUser;
    } catch (err) {
      console.error(err);
      return { staus: 'unexpected', err };
    }
  },
  // 회원 가입
  registerUser: async (newUser) => {
    try {
      const registerResult = await User.create(newUser);
      if (!registerResult) throw new Error('회원 등록 실패');
      return { status: 'success' };
    } catch (err) {
      console.error(err);
      if (err.code === 11000) return { status: 'duplicated' };
      return { status: 'unexpected', err };
    }
  },
};

module.exports = db;
