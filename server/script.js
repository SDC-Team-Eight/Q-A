import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
vus: 1100, //stimulate how many virtual users
// rps:100,
duration: "30s", //how long you want it to run
};
//GET /qa/questions
export default function () {
  let randomProductId = Math.floor(Math.random() * (1000011 - 1 + 1)) + 1;
  http.get(`http://localhost:3000/qa/questions?product_id=${randomProductId}`);
  sleep(1);
  // http.get(`http://localhost:3000/qa/questions/${randomProductId}/answers`);
  // sleep(1);
}
