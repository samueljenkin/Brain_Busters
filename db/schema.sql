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
    ('What do you call a sleeping bull?', 'A bull-dozer', 'A snore-saurus', 'A siesta-stallion', 'A dozing-donkey', 'A bull-dozer'),
    ('What do you get when you cross a snowman and a vampire?', 'Frostbite', 'Count Slushula', 'Icy Dracula', 'Chilled Bloodsucker', 'Count Slushula'),
    ('What did the grape say when it got stepped on?', "'Ouch, that's grape!'", "'I'm raisin' a fuss!'", "'Wine not?'", "'Well, this is vine!'", "'Well, this is vine!'"),
    ('How do you organize a space party?', 'You planet!', 'You invite the Martians', 'You hire a star DJ', 'You launch confetti into orbit', 'You planet!'),
    ('Why did the bicycle fall over?', 'It was tired', 'It lost its balance', "It didn't like the pedals", 'It was two-tired of standing up', 'It lost its balance'),
    ("Why don't skeletons fight each other?", 'They do not believe in fighting !', "They don't have the guts!", "Because they don't know how to fight", 'Because they might crack up!', "They don't have the guts!"),
    ('How do you catch a squirrel?' , ' Climb a tree and wait for it', 'Leave out a trail of nuts', 'Set up a squirrel trap',  'Act like a nut and the squirrel will come to you', 'Act like a nut and the squirrel will come to you'),
    ('What do you call a bear with no teeth?',  'A gummy bear',  'A toothless teddy',  'A bare gums',  "A dentist's nightmare",  'A gummy bear'),
    ('What did one wall say to the other wall?', "I'll meet you at the corner!", "I'm feeling a bit plastered today.", "I'm bored. Wanna hang out?", "Let's make some cracks together!", "I'm bored. Wanna hang out?"),
    ('I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', 'Echo', 'Windmill', 'Thought', 'Music', 'Echo'),
    ("Why don't scientists trust atoms?", 'Because they make up everything!', "Because they're always changing their minds!, Because they're small and can't be seen!", 'Because they have a lot of potential!', "Because they're always changing their minds!")
;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_digest TEXT
);