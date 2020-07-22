require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express = require('express');
const userRoute = require('./routers/user.router');
const authRoute = require('./routers/auth.router');
const productRoute = require('./routers/product.router');
const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
const cookieParser = require('cookie-parser');
const cartRoute = require('./routers/cart.router'); // cart
const transferRouter = require('./routers/transfer.router');
const csurf = require('csurf');

const app = express();
const post = 3001;

app.set('view engine', 'pug'); //pug
app.set('views', './views'); //foder ./view


// create a new user
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({cookie: true }));

app.get('/', (req, res) => res.render('index'));


app.use(express.static('public')); 

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute)
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRouter);

app.listen(post, (req, res) => console.log(`Server listening on ${post}`));
