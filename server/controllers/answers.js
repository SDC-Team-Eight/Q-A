const models = require('../models');
module.exports = {
  get: (req, res) => {
    let question_id = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    models.answers.getAnswers(question_id, page, count, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Cannot get answers');
      } else {
        if (result.length === 0) {
          res.send({});
        } else {
          res.send(result[0].json_build_object);
        }
      }
    })
  },
  post: (req, res) => {
    const question_id = req.params.question_id;
    const { body, name, email, photos } = req.body;
    models.answers.addAnswer({question_id, body, name, email, photos}, (err, result) => {
          if (err) {
            res.status(400).send('Cannot add the answer')
          } else {
            res.status(201).send('You added an answer!');
          }
    })
  },
  helpfulness: (req, res) => {
    let answer_id = req.params.answer_id;
    models.answers.answerHelpfulness(answer_id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    })
  },
  report: (req, res) => {
    let answer_id = req.params.answer_id;
    models.answers.answerReported(answer_id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    })
  }
}