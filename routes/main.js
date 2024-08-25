  const express = require('express')
  const router = express.Router();
  
  
  //ROUTES

  // homepage api. 
  // it will run as soon as express js server will start running
  router.get('/', (req, res) => {
    res.render('main');
  });




  module.exports = router ;