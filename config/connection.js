var orm      = require('orm');
var fs       = require('fs');
var settings = require('./settings');

db = orm.connect(settings.database, function(err, conn){
  //conn.settings.set('instance.returnAllErrors', true);
});

module.exports = db;
