const  db = require('../db');
const md5 = require('md5');
module.exports.login = (req, res) => res.render('auth/login',{
    users : db.get('users').value() 
});

module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get('users').find({email: email}).value();

    if(!user){
        res.render('auth/login',{
            errors: [
                'User does not exist !'
            ],
            values: req.body
        });
        return;
    }
    let hashPassword = md5(password);
    if(md5(user.password) !== hashPassword){
        res.render('auth/login', {
            errors: [
                'Wrong password !'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId' , user.id, {
        signed : true 
    });
    res.redirect('/users');
};