const express = require('express');
const userRoute = require('./routers/user.router');

const app = express();
const post = 3000;

app.set('view engine', 'pug'); //pug
app.set('views', './views');

// create a new user
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.use(express.static('public')); 

app.use('/users', userRoute);

app.listen(post, (req, res) => console.log(`Server listening on ${post}`));
