DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

CREATE TABLE IF NOT EXISTS questions (
  question_id BIGSERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60),
  question_reported BOOLEAN DEFAULT false,
  question_helpfulness INTEGER DEFAULT 0,
  PRIMARY KEY(question_id)
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id BIGSERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60),
  answer_reported BOOLEAN DEFAULT false,
  answer_helpfulness INTEGER DEFAULT 0,
  PRIMARY KEY(answer_id),
  FOREIGN KEY(question_id)
    REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS answerPhotos(
  id BIGSERIAL NOT NULL,
  answer_id BIGSERIAL NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(answer_id)
);

COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, question_reported,question_helpfulness) From '/Users/danmao/Desktop/hr/SDC/questions.csv' DELIMITER ',' CSV HEADER;
COPY answers(answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpfulness) From '/Users/danmao/Desktop/hr/SDC/answers.csv' DELIMITER ',' CSV HEADER;
COPY answerPhotos(id, answer_id, url) From '/Users/danmao/Desktop/hr/SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

