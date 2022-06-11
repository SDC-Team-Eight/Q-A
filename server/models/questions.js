const db = require('../db');
module.exports = {
  getQuestions: (product_id, page, count, callback) => {
    db.query(`
    SELECT CAST ( product_id AS TEXT ), json_agg(
      json_build_object(
        'question_id', questions.id,
        'question_body', questions.question_body,
        'question_date', questions.question_date,
        'asker_name', questions.asker_name,
        'reported',questions.question_reported = false,
        'question_helpfulness', questions.question_helpfulness,
        'answers', (SELECT
          coalesce(answers, '{}'::json)
          FROM (
          SELECT json_object_agg(
            answers.id, json_build_object(
              'id', answers.id,
              'body', answers.answer_body,
              'date',answers.answer_date,
              'answerer_name', answers.answerer_name,
              'reported', answers.answer_reported = false,
              'helpfulness', answers.answer_helpfulness,
              'photos', (
                select coalesce(json_agg(
                    t.url
                  ), '[]'::json) from
                  (SELECT
                      answerPhotos.url
                FROM answerPhotos WHERE answerPhotos.answer_id = answers.id) AS t
              )
            )
          ) AS answers
          FROM answers WHERE answers.id = questions.id
        ) AS answers)
    )
  ) as results
  FROM questions WHERE questions.product_id = ${product_id} AND questions.question_reported = false GROUP BY questions.product_id
`)
  .then((data) => {

    callback(null, data.rows);
  })
  .catch((err) => {
    callback(err, null);
  })
  },
  addQuestion: (dataBody, callback) => {
    // console.log('8888', dataBody);
    let productID = dataBody.product_id;
    let questionBody = dataBody.body;
    let questionDate = Date.now();
    let nameQuestion = dataBody.name;
    let emailQuestion = dataBody.email;
    let reportedQuestion = false;
    let helpfulQuestion = 0;
    db.query(`INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, question_reported, question_helpfulness) VALUES (${productID}, '${questionBody}', '${questionDate}', '${nameQuestion}', '${emailQuestion}',
    ${reportedQuestion}, ${helpfulQuestion})`)
     .then((data) => {
     console.log('data', data);
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    })
  },
 questionHelpfulness: (id, callback) => {
  db.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE questions.id = ${id}`)
  .then((data) => {
    callback(null, data);
  })
  .catch((err) => {
    callback(err, null);
  })
 },
 questionReported: (id, callback) => {
  db.query(`UPDATE questions SET question_reported = TRUE WHERE questions.id = ${id}`)
  .then((data) => {
    callback(null, data);
  })
  .catch((err) => {
    callback(err, null);
  })
 }
}