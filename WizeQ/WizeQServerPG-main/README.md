# Chatbot Server


## Execution Instructions

1. **Clone this repository**
    ```bash
    git clone https://github.com/Alexme116/WizeQServerPG.git
    ```

2. **Change to cloned project directory**
    ```bash
    cd WizeQServerPG
    ```

3. **Install packages and dependencies**
    ```bash
    npm install
    ```

4. **Run the server**
    ```bash
    node --watch index.js
    ```

5. **Install PostgreSQL and pgAdmin**
    ```bash
    sudo apt install postgresql postgresql-contrib
    sudo systemctl start postgresql
    ```

6. **Create new DB**
    ```bash
    sudo -i -u postgres
    psql
    alter user postgres with password 'password';
    CREATE DATABASE wizeq;
    ```

7. **Execute commands to create and populate the tables**
    ```bash
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
    ```

8. **Open pgAdmin and add a new server** <br>
    **Name**: whatever you want <br>
    **Host name/address**: localhost <br>
    **Password**: password
