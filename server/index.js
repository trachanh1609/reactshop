const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();



// App setup

// Morgan is a middleware that logs all requests and response
// This is for debugging
app.use(morgan('combined'));

// Bodyparser will parse all request as json
app.use(bodyParser.json({ type: '*/*'}));


// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)
console.log('Server listening on port ', port);
