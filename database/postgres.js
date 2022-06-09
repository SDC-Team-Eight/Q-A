DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date DATE NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60)
  question_reported INTEGER DEFAULT 0,
  question_helpfulness INTEGER DEFAULT 0,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS answers (
  id BIGSERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date DATE NOT NULL,
  anserer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60),
  answer_reported INTEGER DEFAULT 0,
  answer_helpfulness INTEGER DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY(question_id)
    REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS answerPhotos(
  id BIGSERIAL NOT NULL,
  answer_id BIGSERIAL NOT NULL,
  url VARCHAR(255),
  PRIMARY KEY(id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(id)
);