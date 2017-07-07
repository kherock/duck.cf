'use strict';
require('./globals');

const app = require('./app');
Promise.try(async () => {
  console.log(`   ${'[Busy]'.yellow} Launching Duck`);
  await app.run(3000);
  console.log(`   ${'[Active]'.green} ${app.name} started`);
  console.log(`            Environment: ${app.env}`);
  console.log(`            Port: ${app.server.address().port}`);
  console.log();
}).catch((err) => {
  console.log(err.stack.red);
});
