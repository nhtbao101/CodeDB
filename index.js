const express = require('express');
const userRoute = require('./routers/user.router');
const authRoute = require('./routers/auth.router');
const authMiddleware = require('./middleware/auth.middleware');
var cookieParser = require('cookie-parser');

const app = express();
const post = 3001;

app.set('view engine', 'pug'); //pug
app.set('views', './views');

// create a new user
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => res.render('index'));


app.use(express.static('public')); 

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute)

app.listen(post, (req, res) => console.log(`Server listening on ${post}`));
