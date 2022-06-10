const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
module.exports.app = app;
const router = require('./routes.js');

app.use(cors());
app.use(express.json());
app.use('/qa', router);
// app.get('/', (req, res) => {
//   res.send('Hello world');
// })
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
})