const {Pool} = require('pg');
// const db = new Pool({
//   host: 'localhost',
//   user: process.env.DB_USERNAME,
//   database: 'qa',
//   port:5432,
// });
//   db
//    .connect()
//    .then(() => console.log('Connected!'))
//    .catch((err) => console.error(err));
const db = new Pool({
  host: '44.204.0.140',
  user: 'test_user',
  password:'testpassword',
  database: 'qa',
  port: 5432,
});
  db
   .connect()
   .then(() => console.log('Connected!'))
   .catch((err) => console.error(err));

module.exports = db;