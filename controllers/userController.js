// @ts-check
const connection = require('./dbConnect');

const db = {
  getUsers: (cb) => {
    connection.query('SELECT * FROM mydb1.user', (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
};

module.exports = db;
