var _        = require('lodash');
var settings = require('../config/settings');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.cookies.current_user) {
    res.redirect('/rooms/1');
  } else {
    res.render('sign/signin', { error: null });
  }
});

router.post('/', function(req, res, next) {
  var email = req.body.email,
      pass  = req.body.pass;
  User.signin({email: email, password: pass}, function(user) {
    res.cookie('current_user', user.email, { maxAge: 1000*60*60*24*7 });
    res.cookie('user_id', user.id, { maxAge: 1000*60*60*24*7 });
    res.redirect('/rooms/1');
  }, function() {
    res.render('sign/signin', { error: 'Incorrect email or password !' });
  });

});

router.post('/clear', function(req, res, next) {
  res.clearCookie('current_user');
  res.clearCookie('user_id');
  res.redirect('/signin');
});

module.exports = router;
