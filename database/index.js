const {Client} = require('pg');
const client = new Client({
  host: 'localhost',
  user: process.env.USER,
  database: process.env.DB,
  port:5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});