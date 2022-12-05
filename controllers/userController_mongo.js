// @ts-check
const mongoClient = require('./mongoConnect');

const db = {
  getUsers: (cb) => {
    connection.query('SELECT * FROM mydb.user', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  // 유저 중복 체크
  userCheck: async (userId) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const findUser = await user.findOne({ id: userId });
    if (!findUser) return false;
    return findUser;
  },
  // 회원 가입
  registerUser: async (newUser) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const registerResult = await user.insertOne(newUser);
    if (!registerResult.acknowledged) throw new Error('회원 등록 실패');
    return true;
  },
};

module.exports = db;
