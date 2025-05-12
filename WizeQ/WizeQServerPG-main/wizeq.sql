CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(200),
    password VARCHAR(200)
);

CREATE TABLE chats (
    ID SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(ID),
    title VARCHAR(200)
);

CREATE TABLE messages (
    ID SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chats(ID),
    is_from VARCHAR(200),
    message TEXT
);

INSERT INTO users (name, email, password)
    VALUES ('Alex', 'alex@gmail.com', '123');

INSERT INTO chats (user_id, title)
    VALUES (1, 'New Chat');

INSERT INTO chats (user_id, title)
    VALUES (1, 'Prueba');

INSERT INTO messages (chat_id, is_from, message)
    VALUES (1, 'User', 'Hello!');

INSERT INTO messages (chat_id, is_from, message)
    VALUES (1, 'ChatBot', 'Hi User!');
