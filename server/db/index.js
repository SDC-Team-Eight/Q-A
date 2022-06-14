require('dotenv').config();
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
  host: process.env.PGHOST,
  user: process.env.USER,
  password: process.env.PGPASSWORD,
  database: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
  db
   .connect()
   .then(() => console.log('Connected!'))
   .catch((err) => console.error(err));

module.exports = db;