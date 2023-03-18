const Zing = require('../modules/ZingMp3');

// ./src/index.js 
console.log('Hello there!');

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

const ads = [
  { title: 'API to crawl songs from ZingMp3' },
  { author: 'dat911zz' },
  { link_docs: 'https://zingmp3api-dvn.onrender.com/api-docs/' }
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// error handler middleware
app.use((error, req, res, next) => {
  console.log('in Error middleware')
  console.error(error.stack);
  res.status(500).send(error.message || 'Something Broke!');
})

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');


try {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  // defining an endpoint to return all ads
  app.get('/', (req, res) => {
    res.send(ads);
  });
  app.get('/home', (req, res) => {
    Zing.getDetailPlaylist('ZU9ZO7DU').then(data => res.json(data), error => res.status(500));
  });
  app.get('/getChartHome', (req, res) => {
    Zing.getChartHome().then(data => res.json(data), error => res.status(500));
  });
  app.get('/top100', (req, res) => {
    Zing.getTop100().then(data => res.json(data), error => res.status(500));
  });
  app.get('/getSongInfo/:id', (req, res) => {
    Zing.getInfoMusic(req.params.id).then(data => res.json(data), error => res.status(500));
  });
  app.get('/getStreaming/:id', (req, res) => {
    Zing.getStreaming(req.params.id).then(data => res.json(data), error => res.json(error));
  });
  app.get('/getFullInfo/:id', (req, res) => {
    Zing.getFullInfo(req.params.id).then(data => res.json(data), error => res.status(500));
  });
  app.get('/getDetailPlaylist/:id', (req, res) => {
    Zing.getDetailPlaylist(req.params.id).then(data => res.json(data), error => res.status(500));
  });
  app.get('/getDetailArtist/:alias', (req, res) => {
    Zing.getDetailArtist(req.params.alias).then(data => res.json(data), error => res.status(500));
  });
  app.get('/search/:keyword', (req, res) => {
    Zing.search(req.params.keyword).then(data => res.json(data), error => res.json(error));
  });

} catch (ex) {
  console.log('Ex: ' + ex);
}
console.log(Zing.getDetailPlaylist('ZU9ZO7DU'));
// starting the server
app.listen(3000, () => {
  console.log('listening on port 3000');
});