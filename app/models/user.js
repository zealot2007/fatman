var orm = require('orm');
var crypt = require('bcrypt-nodejs');
var db  = require('../../config/connection');

function define_model(db) {
  var User = db.define('users', {
    email                  : { type: 'text', required: true },
    encrypted_password     : { type: 'text', required: true },
    salt                   : { type: 'text', required: true },
    reset_password_token   : { type: 'text' },
    reset_password_sent_at : { type: 'date' },
    remember_created_at    : { type: 'date' },
    name                   : { type: 'text', required: true },
    created_at             : { type: 'date', required: true, time: true },
    //updated_at             : { type: 'date', required: true, time: true }
  }, {
    hooks: {
      beforeValidation: function() {
        this.created_at = new Date();
      }
    },
    validations: {
      name: orm.enforce.ranges.length(5, 20)
    },
    methods: {
      serialize: function() {
        return {
          id         : this.id,
          email      : this.email,
          name       : this.name,
          created_at : this.created_at,
          updated_at : this.updated_at
        }
      }
    }
  });

  User.hasMany('messages', db.models.message, {});

  User.register = function(options, callback) {
    options.salt = crypt.genSaltSync();
    options.encrypted_password = crypt.hashSync(options.password, options.salt);
    delete options.password;
    return this.create(options, callback);
  };

  User.signin = function(options, callback, errback) {
    this.find({email: options.email}, 1, function(err, users) {
      if (err) throw err;
      if (users[0].encrypted_password !== crypt.hashSync(options.password, users[0].salt)) {
        errback();
      } else {
        callback(users[0]);
      }
    });
  };

  return User;
}

module.exports.model = define_model(db);
module.exports.setup = function(db) {
  return define_model(db);
};
