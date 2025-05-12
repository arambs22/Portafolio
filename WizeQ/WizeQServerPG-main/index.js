const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const port = 3000;

// routes
const userRoutes = require('./routes/userRoutes');
const chatsRoutes = require('./routes/chatsRoutes');
const messageRoutes = require('./routes/messageRoutes');

//const feedbackRoutes = require('./routes/feedbackRoutes');

// express functions
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// testing
app.get("/", (req, res) => {
    res.json({info: "Hello World"});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// endpoints
app.use('/users', userRoutes);
app.use('/chats', chatsRoutes);
app.use('/messages', messageRoutes);