CREATE DATABASE quiz_app;
\c quiz_app

CREATE TABLE quizzes(
    id SERIAL PRIMARY KEY,
    question TEXT,
    answer_a TEXT,
    answer_b TEXT,
    answer_c TEXT,
    answer_d TEXT,
    correct_answer TEXT
    -- only an example, require group discussion (same style as API?)
);

INSERT INTO quizzes(question, answer_a, answer_b, answer_c, answer_d, correct_answer)
VALUES
    ('What is 1 + 1?', '1', '2', '3', '5', '2'),
    ('What is blue in french?', 'blu', 'blue', 'bleu', 'bloo', 'bleu'),
    ('What time is noon?', '12pm', '12am', '6am', '6pm', '12pm');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_digest TEXT
);