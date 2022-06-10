const db = require('../db');
module.exports = {
  getQuestions: (product_id, page, count, callback) => {
    db.query(`
    SELECT CAST ( product_id AS TEXT ), json_agg(
      json_build_object(
        'question_id', questions.question_id,
        'question_body', questions.question_body,
        'question_date', TO_CHAR(TO_TIMESTAMP(questions.question_date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
        'asker_name', questions.asker_name,
        'reported',questions.question_reported = false,
        'question_helpfulness', questions.question_helpfulness,
        'answers', (SELECT
          coalesce(answers, '{}'::json)
          FROM (
          SELECT json_object_agg(
            answers.answer_id, json_build_object(
              'id', answers.answer_id,
              'body', answers.answer_body,
              'date', TO_CHAR(TO_TIMESTAMP(answers.answer_date / 1000), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
              'answerer_name', answers.answerer_name,
              'reported', answers.answer_reported = false,
              'helpfulness', answers.answer_helpfulness,
              'photos', (
                select coalesce(json_agg(
                    t.url
                  ), '[]'::json) from
                  (SELECT
                      answerPhotos.url
                FROM answerPhotos WHERE answerPhotos.answer_id = answers.answer_id) AS t
              )
            )
          ) AS answers
          FROM answers WHERE answers.question_id = questions.question_id
        ) AS answers)
    )
  ) as results
  FROM questions WHERE questions.product_id = ${product_id} AND questions.question_reported = false GROUP BY questions.product_id;
`)
  .then((data) => {
    callback(null, data);
  })
  .catch((err) => {
    callback(err, null);
  })
  },
  addQuestion: (dataBody, callback) => {
    console.log(dataBody);
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
     console.log('data', data)
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    })
  },
 questionHelpfulness: (question_id, callback) => {
  db.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE questions.question_id = ${question_id}`)
  .then((data) => {
    callback(null, data);
  })
  .catch((err) => {
    callback(err, null);
  })
 },
 questionReported: (question_id, callback) => {
  db.query(`UPDATE questions SET question_reported = TRUE WHERE questions.question_id = ${question_id}`)
  .then((data) => {
    callback(null, data);
  })
  .catch((err) => {
    callback(err, null);
  })
 }
}