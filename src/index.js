const Zing = require('../modules/ZingMp3');

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// defining the Express app
const app = express();

const homeTitle = [
  { title: 'API to crawl songs from ZingMp3' },
  { author: 'dat911zz' },
  { link_docs: 'https://zingmp3api-dvn.onrender.com/api-docs/' }
];

//Logip
app.use((req, res, next) => {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log("Request ip: " + ip);
  next();
});


// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// error handler middleware
app.use((error, req, res, next) => {
  console.log('In Error middleware: ' + req.path);
  console.log('Respond: ' + res);
  console.error(error.stack);
  next();
})

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.get('/err1', (req, res) => {
  res.status(500).send("Lỗi đang test hệ thống!");
});
//#region GET methods
app.get('/', (req, res) => {
  res.send(homeTitle);
});
app.get('/home', (req, res) => {
  Zing.getDetailPlaylist('ZU9ZO7DU')
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/getChartHome', (req, res) => {
  Zing.getChartHome()
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/top100', (req, res) => {
  Zing.getTop100()
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/getSongInfo/:id', (req, res) => {
  Zing.getInfoMusic(req.params.id)
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/getStreaming/:id', (req, res) => {
  Zing.getStreaming(req.params.id)
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/getFullInfo/:id', (req, res) => {
  Zing.getFullInfo(req.params.id)
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/getDetailPlaylist/:id', (req, res) => {
  Zing.getDetailPlaylist(req.params.id)
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/getDetailArtist/:alias', (req, res) => {
  Zing.getDetailArtist(req.params.alias)
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
app.get('/search/:keyword', (req, res) => {
  Zing.search(req.params.keyword)
    .then(data => res.json(data), error => res.json(error))
    .catch(err => console.log("error:", err));
});
//#endregion
//#region Schedule job
const cron = require('node-cron');
const { exec } = require('child_process');

app.get('/install-pm2', (req, res) => {
  exec('npm install pm2 -g', (err, stdout, stderr) =>{
    if (err) {
      console.error(err);
    } else {
      console.log(stdout);
    }
  });
  res.send("pm2 installed");
});

app.get('/init-monitor', (req, res) => {
  exec('echo $PATH; pm2 link e0if4603qt1hwks b36rn4uqof8so55; pm2 start src', (err, stdout, stderr) =>{
    if (err) {
      console.error(err);
    } else {
      console.log(stdout);
    }
  });
  res.send("Monitor has been started");
});
app.get('/stop-monitor', (req, res) => {
  exec('pm2 kill', (err, stdout, stderr) =>{
    if (err) {
      console.error(err);
    } else {
      console.log(stdout);
    }
  });
  res.send("Monitor has been stoped!");
});

cron.schedule('*/20 * * * *', () => {
  exec('pm2 restart src', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(stdout);
    }
  });
});

//#endregion

// starting the server
app.listen(3000, () => {
  console.log('listening on port 3000');
});