const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: { type: Number, index: true },
  question_body: String,
  question_date: Date,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpfulness: Number
});

const answerSchema = new mongoose.Schema({
  answer_id: { type: Number, unique: true },
  question_id: { type: Number, index: true },
  answer_body: String,
  answer_date: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpfulness: Number,
  photos: [
    {
      photo_id: { type: Number, unique: true },
      answer_id: Number,
      url: String
    }
  ]
});

