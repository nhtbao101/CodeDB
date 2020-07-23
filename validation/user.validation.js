module.exports.postCreate = function(req, res, next){
    var errors = [];
    let special = "`~!@#$%^&*()<>?:{},./;[]";
    let name = req.body.name;
    let phone = req.body.phone;
    if (!name){
        errors.push('Name is invalid !!! ');
    }
    if (!phone){
        errors.push('Phone is invalid !!! ');
    }
    if (errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
};
