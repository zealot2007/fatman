var path = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  database   : {
    protocol : 'mysql',
    query    : { pool: true },
    host     : 'localhost',
    database : 'nodejs',
    user     : 'root'
    //password : 'xxxx'
  }
};

module.exports = settings;
