const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost:27017/auth');
    // .catch(err => { // we will not be here...
    //     console.error('App starting error:', err.stack);
    //
    // });


// App setup

// Morgan is a middleware that logs all requests and response
// This is for debugging
app.use(morgan('combined'));

// Bodyparser will parse all request as json
app.use(bodyParser.json({ type: '*/*'}));

router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)
console.log('Server listening on port ', port);
