const shortid = require('shortid'); 
const  db = require('../db'); 

module.exports.index = ((req, res) => res.render('users/index',{
    users : db.get('users').value() 
}));

module.exports.search = ((req, res) => {
    var q = req.query.q;
    var matchUser = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchUser
    }); 
});

module.exports.create = ((req, res) => {
    console.log(req.cookies);
    res.render('users/create');
});

module.exports.getID = ((req, res) => {
    let id = req.params.id;
    user = db.get('users').find({id:id}).value();
    res.render('users/view',{
        user: user 
    });
});

module.exports.postCreate = ((req, res) => {
    req.body.id = shortid.generate();    
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    db.get('users').push(req.body).write(); // get user from db
    res.redirect('/users');
});
