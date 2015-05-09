var fs       = require('fs');
var orm      = require('orm');
var settings = require('../config/settings');
var db       = require('../config/connection');

function migrate() {
  // ordered required since there is dependency
  require('../app/models/message.js').setup(db);
  require('../app/models/user.js').setup(db);
  require('../app/models/room.js').setup(db);

  db.drop(function(err) {
    if (err) throw err;

    db.sync(function(err) {
      if (err) throw err;

      db.close();
      console.log('Done');
    });
  });
};

function createDB() {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: settings.database.host,
    user: settings.database.user,
    password: settings.database.password});
  connection.connect();
  connection.query('create database ' + settings.database.database, function(err) {
    if (err) throw err;
  });
  connection.end();
}

createDB();
migrate();

