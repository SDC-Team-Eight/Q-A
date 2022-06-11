const app = require('../server/index.js').app;
const request = require('supertest');
describe('Get/qa/questions', () => {
  test('it should respond with 200 status code and with json object', (done) => {
    request(app)
      .get('/qa/questions?product_id=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('GET /qa/questions/:question_id/answers', () => {
 test('it should respond with 200 status code and with json object', (done) => {
    request(app)
      .get('/qa/questions/1/answers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
