const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';
const User = require('../mongoose/userCollection');

mongoose.connect(url + '/mongoose');

router.use(express.urlencoded({ extended: false}));

router.get('/', (req, res) => {
    res.render('./mongoose/views/register');
});

router.post('/', (req, res) => {
    let userId_;
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

   async function newUser() {
       try{
           const passwordHash = await bcrypt.hash(password,10);
           const user = await User.register.create({
               name:name,
               email:email,
               password: passwordHash,
               date: Date(),
            });
            console.log(user);
            userId_ = user._id;
            
        } catch(e) {
            console.log(e.message);
        };
    };

    async function session() {
        try{
            const user = await User.session.create({
                userId: userId_,
                date : Date(),
                ip_address: 'null',
            });
            console.log(user);
                        
        }catch(e) {
            console.log(e.message);
        };
    };

    ValidInfo();
    async function ValidInfo(){
        console.log(name,email,password)
        const regexName = /^(?!.*[_.]{2})[a-zA-Z0-9._]{2,20}$/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        /*
        password regular expression:
        It must not contain any whitespace.
        It must contain at least one uppercase, one lowercase and one numeric character.
        It must contain at least one special character. [~`!@#$%^&*()--+={}[]|\:;"'<>,.?/_₹]
        Length must be between 6 to 20 characters.
        */
        const regexPassword = /^[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{3,30}$/;

        const nameExists = await User.register.exists({name : name});
        const emailExists = await User.register.exists({email : email});
        console.log(nameExists)
        if(nameExists){
            res.send('user already taken this name')

        }else{
            if(emailExists){
                res.send('user already taken this email');
            }else{
                if(regexName.test(name) && regexEmail.test(email) && regexPassword.test(password)){
                    console.log('its working');
                    await newUser();
                    await session();
                    res.redirect('/signin');
                }
                else{
                    console.log('its not working');
                    res.redirect('/signup');
                };

            };
        };
    };
        
});

module.exports = router;