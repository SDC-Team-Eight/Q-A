const db = require('../db');
module.exports ={
  getAnswers: (question_id, page, count, callback) => {
    db.query(`
    SELECT json_build_object(
        'question', CAST ( ${question_id} AS TEXT ),
        'page', ${page},
        'count', ${count},
        'results', json_agg(
          json_build_object(
            'answer_id', answers.id,
            'body', answers.answer_body,
            'date', answers.answer_date,
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.answer_helpfulness,
            'photos', (
              select coalesce(json_agg(
                  json_build_object(
                    'id', t.id,
                    'url', t.url
                  )
                ), '[]'::json) from
                (SELECT
                    answerPhotos.id,
                    answerPhotos.url
              FROM answerPhotos WHERE answerPhotos.id = answers.id) AS t
            )
          )
        )
      )
    FROM answers WHERE answers.question_id = ${question_id} AND answers.answer_reported = false GROUP BY answers.question_id`
  )
    .then((data) => {
      callback(null, data.rows);
    })
    .catch((err) => {
      callback(err, null);
    })
  },
  addAnswer: ({question_id, body, name, email, photos = [], date = new Date().toISOString().slice(0, 10)}, callback) => {
    db.query(`
      INSERT INTO answers (question_id, answer_body, answer_date,  answerer_name, answerer_email)
        VALUES (${question_id}, '${body}', '${date}', '${name}', '${email}') RETURNING *`)
          .then((data) => {
            db.query(`INSERT INTO answerPhotos (answer_id, url) VALUES (${data.rows[0].id}, '${photos}')`)
              .then((data) => {
                callback(null, data.rows);
              })
              .catch((err) => {
                callback(err, null);
              });
          })
          .catch((err) => {
            callback(err, null);
          })
  },
  answerHelpfulness: (id, callback) => {
    db.query(`UPDATE answers SET answer_helpfulness = answer_helpfulness  + 1 WHERE answers.id = ${id}`)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    })
  },
  answerReported: (id, callback) => {
    db.query(`UPDATE answers SET answer_reported = TRUE WHERE answers.id = ${id}`)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    })
  }
}