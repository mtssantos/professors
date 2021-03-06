const fs = require('fs');
const express = require('express');
const nunjucks = require('nunjucks');
const Seed = require('./seeders/index.js');
const Migration = require('./migrations/index.js');

const routes = require('./routes');

const functions = require('./controllers/ProfsControllers');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static('public'));
server.use(routes);


server.set('view engine', 'njk');

nunjucks.configure('src/views', {
  express: server,
  autoescape: true,
  noCache: true,
});

(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();
    await Seed.up();
  }
})();

server.get('/', functions.index)
server.delete('/profs/:id', functions.destroy)


server.listen(3000, () => {
  console.log('Profs server is running!');
});
