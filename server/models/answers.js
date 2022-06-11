const db = require('../db');
// module.exports ={
//   getAnswers: ({question_id}, {page = 1, count = 5}) => {
//     return db.query(
//       `SELECT id,
//        answer_body,
//         answer_date,
//         answerer_name,
//         answer_helpfulness,
//         COALESCE((select json_agg(p.url) from answerPhotos p WHERE p.id = a.id), json_build_array()) AS answerPhotos FROM answers a WHERE a.question_id = ${question_id}
//         AND NOT a.answer_reported LIMIT ${count} OFFSET ${(page-1)*count}
//       `
//     );
//   },
//   addAnswer: ({question_id}, {body, name, email}, date) => {
//     return db.query (
//       `INSWERT INTO answers
//       (
//         question_id,
//         answer_body,
//         answer_date,
//         answerer_name,
//         answerer_email,
//         answerer_reported,
//         answer_helpfulness)
//         VALUES
//           (
//             ${question_id},
//             ${body},
//             to_timestamp(${date}),
//             ${name},
//             ${email},
//             FALSE,
//             0
//           )
//     RETURNING id`
//     );
//   },
//   answerHelpfulness: ({id}) => {
//     return db.query(
//       `UPDATE answers SET answer_helpfulness = answer_helpfuless + 1 WHERE id = ${id}`
//     );
//   },
//   answerReported: ({id}) => {
//     return db.query(
//       `UPDATE answers SET answer_reported = TRUE WHERE id = ${id}`
//     );
//   }
// };
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
  addAnswer: (question_id, dataBody, callback) => {
    let answerBody = dataBody.body;
    let answerDate = Date.now();
    let nameAnswer = dataBody.name;
    let emailAnswer = dataBody.email;
    let reportedAnswer = false;
    let helpfulAnswer = 0;

    let photos = dataBody.photos;
    db.query(`INSERT INTO answers (question_id, answer_body, answer_date, answerer_name, answerer_email, answerer_reported,answer_helpfulness)
    VALUES(${question_id}, '${answerBody}', '${answerDate}', '${nameAnswer}', '${emailAnswer}', ${reportedAnswer}, ${helpfulAnswer}) RETURNING id;`)
    .then((data) => {
      db.query(`INSERT INTO answerPhotos (id, url) VALUES (${data[0].id}, '${photos}')`)
        .then((data) => {
          callback(null, data);
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