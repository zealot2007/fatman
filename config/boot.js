var fs = require('fs');

String.prototype.capitalize = function() {
  return this.slice(0,1).toUpperCase() + this.slice(1).toLowerCase();
};

fs.readdir(process.cwd() + '/app/models', function(err, files) {
  files.forEach(function(file) {
      eval(
        file.split('.')[0].capitalize() +
        " =  require('../app/models/" +
        file +
        "').model;");
  });
});
