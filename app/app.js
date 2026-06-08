const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config({ path: './config.env' });
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const { authLocal } = require('./middleware/auth');
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(authLocal);
app.use('/', router);
app.set('view engine', 'ejs');

app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Express listening on port ${process.env.PORT}`);
});