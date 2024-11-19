const express = require('express');
const morgan = require('morgan');
const handlebar = require('handlebars');
const exphbs = require('express-handlebars');
const config = require('./config')
const path = require('path');
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const handlebarsHelpers = require('./libs/helpers')

const { createRoles, createCategory, updateCreate } = require('./libs/initialSetup')

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const app = express();
// createRoles();
// createCategory();
// updateCreate();

require('./passport/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'homeweb',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebar),
    helpers: handlebarsHelpers
}));

app.set('view engine', '.hbs');

// middlewares

// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.message = req.flash();
    res.locals.user = req.user || null;
    next();
})

app.use(express.json());
//routers
app.use(require('./controllers/index'));
app.use(require('./controllers/controller/products.routes'))
app.use(require('./controllers/controller/auth.routes'))
app.use(require('./controllers/controller/users.routes'))
app.use(require('./controllers/controller/orders.routes'))
app.use(require('./controllers/controller/config.routes'))

// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;