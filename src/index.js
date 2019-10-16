const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const nodemailer = require ('nodemailer');
// Initializations
const app = express();
require('./database');
require('./config/passport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

//mailer


app.post('/enviar', (req, res)=>{
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: 'fumiservi8@gmail.com',
        pass: 'victor543'
    }
});


  let info = transporter.sendMail({
    from: '"Flaresstorm 👻" <FumiServi8@gmail.com>', // sender address
    to: req.body.emaill, // list of receivers
    subject: "MY MAILER APP", // Subject line
    text: req.body.text // plain text body
    
  });
  req.flash('success_msg', 'Correo enviado');
  res.redirect('/mailer');
  console.log("Message sent to", req.body.emaill );
 

 

});
  
