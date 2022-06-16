import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
vus: 1000, //stimulate how many virtual users
rps:1000,
duration: "30s", //how long you want it to run
};

export default function () {
  let randomNumber = Math.floor(Math.random() * (1000011 - 1 + 1)) + 1;
  // GET /qa/questions
  http.get(`http://localhost:3000/qa/questions?product_id=${randomNumber}`);
  sleep(1);
  //Get answers
  // http.get(`http://localhost:3000/qa/questions/${randomNumber}/answers`);
  // sleep(1);
  // Post question
  // const params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // const data = JSON.stringify({
  //   product_id: 1,
  //   body: `new question ${__VU}: ${__ITER}`,
  //   name: 'test',
  //   email: 'test@gmail.com',
  // });
  // http.post(`http://localhost:3000/qa/questions`, data, params);
  // sleep(1);

  //Post answers
  // const params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // const data = JSON.stringify({
  //   body: `new answer ${__VU}: ${__ITER}`,
  //   name: 'test',
  //   email: 'test@gmail.com',
  //   photos:[]
  // });
  // http.post(`http://localhost:3000/qa/questions/${randomNumber}/answers`, data, params);
  // sleep(1);

  //PATCH helpful QUESTIONS
  // http.put(`http://localhost:3000/qa/questions/${randomNumber}/helpful`)
  //PATCH REPORT QUESTIONS
  // http.put(`http://localhost:3000/qa/questions/${randomNumber}/report`)

  // PATCH HELPFUL ANSWERS
  // http.put(`http://localhost:3000/qa/answers/${randomNumber}/helpful`)
  //PATCH REPORT ANSWERS
  // http.put(`http://localhost:3000/qa/answers/${randomNumber}/report`)

}




