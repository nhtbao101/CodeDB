const db = require('../db');

module.exports.index = (function(req, res){
    let page = parseInt(req.query.page) || 1; //n
    let perPage = 8;
    let start  = (page - 1)*perPage;
    let end = page*perPage;
    let drop =(page -1)*perPage;


    res.render('products/index',{
        // products : db.get('products').value().slice(start,end)
        products : db.get('products').drop(drop).take(perPage).value()
    });
});

module.exports.search = ((req, res) => {
    var key = req.query.q;
    var matchProduct = db.get('products').value().filter(product => {
        return product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
    res.render('products/index', {
        products: matchProduct
    }); 
});


