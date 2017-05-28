const express = require('express');
const body_parser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, If-None-Match');
    next();
});
app.use('/api', routes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});

