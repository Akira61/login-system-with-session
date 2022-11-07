
const express = require("express");
const router = express.Router()
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const url = 'mongodb://localhost:27017';

const sessionStore = MongodbStore({
    uri : url + '/mongoose',
    collection : 'user-sessions',
});

router.use(session({
    secret : 'fdsdffff#$%^dfhjk3ww343f23^%$#E;dlv',
    //resave is to create new session for evry requsite
    resave : false,
    saveUninitialized : false,
    store : sessionStore,

}),LoggedIn);

// making sure the user loggedin befor visit the page
function LoggedIn(req, res, next) {
    if(req.session.login) {
        next()
    }
    else{
        res.type('text/html').send(`You are not logged in <a href='/signin'> login</a>`)
    }
};

module.exports = router;
