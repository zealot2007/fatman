var orm = require('orm');
var db  = require('../../config/connection');

function define_model(db) {
  var Room = db.define('rooms', {
    title                  : { type: 'text' },
    created_at             : { type: 'date', required: true, time: true },
    //updated_at             : { type: 'date', required: true, time: true }
  }, {
    hooks: {
      beforeValidation: function() {
        this.created_at = new Date();
      }
    },
    validations: {
    },
    methods: {
      serialize: function() {
        return {
          title      : this.title,
          created_at : this.created_at,
          updated_at : this.updated_at
        }
      }
    }
  });

  Room.hasMany('users', db.models.user, {});

  return Room;
}

module.exports.model = define_model(db);
module.exports.setup = function(db) {
  return define_model(db);
};
