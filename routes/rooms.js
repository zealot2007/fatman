var _        = require('lodash');
var express  = require('express');
var settings = require('../config/settings');
var router   = express.Router();

router.get('/:id', function(req, res, next) {
  if (req.cookies.current_user) {
    var id = parseInt(req.params['id']);
    Room.get(id, function(err, room) {
      if (err) {
        res.sendFile(settings.path + '/public/404.html');
      } else {
        Message.find({ session_id: room.id }, 10, ['id', 'Z'], function(err, msgs) {
          if (err) {
            throw err;
          } else {
            res.render('rooms/show', { user_id: req.cookies.user_id, id: id, messages: msgs.reverse() });
          }
        });
      }
    });
  } else {
    res.redirect('/signin');
  }
});


module.exports = router;
