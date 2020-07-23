const Product = require('../models/product.model');
const { query } = require('express');
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
    Product.find().then(function(products){
        res.render('products/index',{
            products: products 
        });
    });
});

// module.exports.index = async function(req, res){
//     let products = await Product.find();
//     res.render('products/index',{
//         products: products 
//     });
// }

// module.exports.search = async function(req, res ){
//     let querySearch = req.query.querySearch;
//     console.log(querySearch)
//     let matchProduct = await Product.find();
//     const result = matchProduct.filter(product => {
//         return product.name.toLowerCase().includes(querySearch.toLowerCase());
//     });
//     res.render('products/index', {
//         products: result
//     });
// };
module.exports.search = ((req, res) => {
    var querySearch = req.query.querySearch;
    var matchProduct = db.get('products').value().filter(product => {
        return product.name.toLowerCase().indexOf(querySearch.toLowerCase()) !== -1;
    });

    res.render('products/index', {
        products: matchProduct.length? matchProduct : undefined
    });    
    
});


