var orm = require('orm');
var db  = require('../../config/connection');

function define_model(db) {
  var Message = db.define('messages', {
    sender_id    : { type: 'integer', required: true },
    recipient_id : { type: 'integer' },
    session_id   : { type: 'integer', required: true },
    body         : { type: 'text', required: true},
    created_at   : { type: 'date', required: true, time: true },
    //updated_at   : { type: 'date', required: true, time: true }
  }, {
    hooks: {
      beforeValidation: function() {
        this.created_at = new Date();
      }
    },
    validations: {
      body: orm.enforce.ranges.length(1, 200)
    },
    methods: {
      serialize: function() {
        return {
          id           : this.id,
          sender_id    : this.sender_id,
          recipient_id : this.recipient_id,
          session_id   : this.session_id,
          body         : this.body,
          created_at   : this.created_at,
          updated_at   : this.updated_at
        }
      }
    }
  });

  return Message;
}

module.exports.model = define_model(db);
module.exports.setup = function(db) {
  return define_model(db);
};
