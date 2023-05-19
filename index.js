// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const os = require('os');
const { inject } = require('@vercel/analytics');

inject();
require('winston-syslog');

const papertrail = new winston.transports.Syslog({
  host: 'logs3.papertrailapp.com',
  port: 42763,
  protocol: 'tls4',
  localhost: os.hostname(),
  colorize: true,
  app_name: 'Cringe-API',
  eol: '\n',
});

const logger = winston.createLogger({
  format: winston.format.simple(),
  levels: winston.config.syslog.levels,
  transports: [papertrail],
});
console.log = logger.info.bind(logger);
console.error = logger.error.bind(logger);

// defining the Express app
const app = express();
const homeTitle = [
  { title: 'API to crawl songs from ZingMp3' },
  { author: 'dat911zz' },
  { link_docs: 'https://cringe-mp3-api.vercel.app/api-docs/' }
];
//log into logging system
app.use(morgan('combined', {
  stream: {
    write: function (msg) {
      logger.info("[Vercel server]:" + msg);
    }
  }
}));
//Logip
app.use((req, res, next) => {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log("Request ip: " + ip);
  next();
});
app.use(bodyParser.json());
app.use(morgan('combined'));

// error handler middleware
app.use((error, req, res, next) => {
  console.log('In Error middleware: ' + req.path);
  console.log('Respond: ' + res);
  console.error(error.stack);
  next();
})

const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL })
);
app.get('/err1', (req, res) => {
  res.status(500).send("Lỗi đang test hệ thống!");
});
//#region GET methods
app.get('/', (req, res) => {
  res.send(homeTitle);
});
// ZingMp3Router
const ZingMp3Router = require("./src/router/ZMP3Router");
app.use("/api", cors({ origin: '*' }), ZingMp3Router)
// Page Error
app.get("*", (req, res) => {
    res.send("error: Resouce not found!")
});
//#endregion
const port = 3000;
// starting the server
app.listen(port, () => {
  console.log('listening on port ' + port);
});
// Export the Express API
module.exports = app;