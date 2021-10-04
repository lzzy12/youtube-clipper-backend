const http = require('http');
const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const clipper = require('./api/routes/clipper')

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(clipper.router);

const port = parseInt(process.env.PORT) || 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

exports.server = server;