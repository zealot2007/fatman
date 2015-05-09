require('../config/boot');

// Need to close db connection, or else we have to press CTRL+C to abort.
setTimeout(function(){
  User.register({
    email: 'jerry@example.com',
    name: 'Jerry Smith',
    password: '111111'
  }, function(err, user) {
    if (err) throw err;
  });

  User.register({
    email: 'tom@example.com',
    name: 'Tom Ronald',
    password: '111111'
  }, function(err, user) {
    if (err) throw err;
  });

  Room.create({ title: 'Default' }, function(err, room) {
    if (err) throw err;
  });
  console.log('Done');
}, 1000);
