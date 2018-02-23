const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();



// App setup



// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)
console.log('Server listening on port ', port);
