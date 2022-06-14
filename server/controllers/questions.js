const models = require('../models');
module.exports = {
  get: (req, res) => {
    let product_id = req.query.product_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    models.questions.getQuestions(product_id, page, count, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Cannot get questions');
      } else {
        res.status(200).send(result[0])
      }
    })
  },
  post: (req, res) => {
    const { body, name, email, product_id } = req.body;
    models.questions.addQuestion({ body, name, email, product_id }, (err, result) => {
      if (err) {
        res.status(400).send('Cannot add the question');
      } else {
        res.status(201).send('You added a question');
      }
    })
 },
  helpfulness: (req, res) => {
  let question_id = req.params.question_id;
    models.questions.questionHelpfulness(question_id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    })
  },
  report: (req, res) => {
    let question_id = req.params.question_id;
    models.questions.questionReported(question_id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    })
  }
}