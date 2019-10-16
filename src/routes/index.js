const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/mailer', (req, res) => {
  res.render('mailer');
});

router.post('/mailer', (req, res)=>{
  var emaill = req.body;
  
    console.log(req.body.emaill); 
  
});
module.exports = router;
