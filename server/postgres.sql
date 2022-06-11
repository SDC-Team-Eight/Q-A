DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60),
  question_reported BOOLEAN DEFAULT false,
  question_helpfulness INTEGER DEFAULT 0,
  PRIMARY KEY(id)
);
DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE IF NOT EXISTS answers (
  id BIGSERIAL NOT NULL,
  question_id INTEGER NOT NULL,
  answer_body VARCHAR(1000) NOT NULL,
  answer_date BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60),
  answer_reported BOOLEAN DEFAULT false,
  answer_helpfulness INTEGER DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY(question_id)
    REFERENCES questions(id)
);
DROP TABLE IF EXISTS answerPhotos CASCADE;
CREATE TABLE IF NOT EXISTS answerPhotos(
  id BIGSERIAL NOT NULL,
  answer_id BIGSERIAL NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(id)
);

COPY questions(id, product_id, question_body, question_date, asker_name, asker_email, question_reported,question_helpfulness) From '/Users/danmao/Desktop/hr/SDC/questions.csv' DELIMITER ',' CSV HEADER;
COPY answers(id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpfulness) From '/Users/danmao/Desktop/hr/SDC/answers.csv' DELIMITER ',' CSV HEADER;
COPY answerPhotos(id, answer_id, url) From '/Users/danmao/Desktop/hr/SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE answers ALTER COLUMN answer_date TYPE TIMESTAMP USING (to_timestamp(answer_date::decimal/1000));
ALTER TABLE questions ALTER COLUMN question_date TYPE TIMESTAMP USING (to_timestamp(question_date::decimal/1000));

CREATE INDEX idx_product_id ON questions(product_id);
CREATE INDEX idx_question_id ON answers(question_id);
CREATE INDEX idx_answer_id ON answerPhotos(answer_id);

SELECT setval('questions_id_seq', 3518963, true);
SELECT setval('answers_id_seq', 6879306, true);
SELECT setval('answerPhotos_id_seq', 2063759, true);
