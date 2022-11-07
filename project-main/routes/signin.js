const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';
const User = require('../mongoose/userCollection');
const MongodbStore = require('connect-mongodb-session')(session);

mongoose.connect(url + '/mongoose');

const sessionStore = MongodbStore({
    uri : url + '/mongoose',
    collection : 'user-sessions',
});

router.use(express.urlencoded({ extended: false}));

router.use(session({
    secret : 'fdsdffff#$%^dfhjk3ww343f23^%$#E;dlv',
    //resave is to create new session for evry requsite
    resave : false,
    saveUninitialized : false,
    store : sessionStore,
    unset: 'destroy',
}));

router.get('/', (req, res) => {
    //./mongoose/views/signin.ejs
    res.render('./mongoose/views/signin.ejs');
});

router.post('/', async (req, res) => {
    const user = await User.register.findOne({email: req.body.email});
    console.log(req.body);
    console.log('user');
    if (!user){
        //res.send('no email fond');
        res.type('text/html').send(`no email fond!
            <br>
            <a href = '/signin'><input type='button' value='المحاولة مرة اخرى'></a>
        `);
    }else{
        if (await bcrypt.compare(req.body.password, user.password)){
            req.session.login = true
            //const saveSession = User.session.find({userId: user._id});
            // updating session_id to user session id 
            //session_id: 'false'
            await User.session.findOneAndUpdate({userId: user._id}, {$set: {session_id: req.session.id}});
            res.type('text/html').send(`you loged in seccessfully!
            <br>
            <a href = '/secret'><input type='button' value='secret page'></a>
            `);
        }
        else{
            res.send(`
            password uncorrect!

            `);
        }
    };
});

module.exports = router;