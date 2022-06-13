const app = require('../server/index.js').app;
const request = require('supertest');
// GET /qa/questions
describe('Get/qa/questions', () => {
  test('it should respond with 200 status code and with json object', (done) => {
    request(app)
      .get('/qa/questions?product_id=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
// GET /qa/questions/:question_id/answers
describe('GET /qa/questions/:question_id/answers', () => {
 test('it should respond with 200 status code and with json object', (done) => {
    request(app)
      .get('/qa/questions/1/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// POST /qa/questions
describe('POST /qa/questions', () => {
  test('it should respond with 201 status code', (done) => {
    request(app)
      .post('/qa/questions')
      .expect(201, done);
  });
});

// POST /qa/questions/:question_id/answers
describe('POST /qa/questions/:question_id/answers', () => {
  test('it should respond with 201 status code', (done) => {
    request(app)
      .post('/qa/questions/1/answers')
      .expect(201, done);
  });
});
// PATCH /qa/questions/:question_id/helpful
describe('PUT /qa/questions/:question_id/helpful', () => {
  test('it should respond with 204 status code', function (done) {
    request(app)
      .put('/qa/questions/1/helpful')
      .expect(204, done);
  });
});

// PATCH /qa/questions/:question_id/report
describe('PATCH /qa/questions/:question_id/report', () => {
  test('it should respond with 204 status code', (done) =>{
    request(app)
      .put('/qa/questions/1/report')
      .expect(204, done);
  });
});

// PATCH /qa/answers/:answer_id/helpful
describe('PUT /qa/answers/:answer_id/helpful', () => {
  test('it should respond with 204 status code', function (done) {
    request(app)
      .put('/qa/answers/2/helpful')
      .expect(204, done);
  });
});

// PATCH /qa/answers/:answer_id/report
describe('PATCH /qa/answers/:answer_id/report', () => {
  test('it should respond with 204 status code', (done) =>{
    request(app)
      .put('/qa/answers/1/report')
      .expect(204, done);
  });
});