const db = require('../db');
const { query } = require('express');

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
    var querySearch = req.query.querySearch;
    var matchProduct = db.get('products').value().filter(product => {
        return product.name.toLowerCase().indexOf(querySearch.toLowerCase()) !== -1;
    });
    res.render('products/index', {
        products: matchProduct
    }); 
    req.query.q = q;
});


