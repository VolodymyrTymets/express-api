const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const SwaggerExpress = require('swagger-express-mw');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerMerger = require('swagger-merger')

const bodyParser = require('body-parser');
const { config } = require('./config');
const api = require('./src/api/index');
const { passport } = require('./src/passport');
const { mongoManager } = require('./src/mongo');
const { onAppStart } = require('./on-start');



const app = express();
mongoManager.connect();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// middleware
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// Authorization
app.use(passport.init());

// Session
app.use(session({
  secret: config.passport.secretAuthToken,
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

// api routes v1
app.use('/api/v1', api(config));


// register api doc
const outputSwaggerDir = path.resolve(config.swaggerDirPath, './build');
const swaggerBuildFilePath = path.resolve(outputSwaggerDir, './swagger.yaml');

if(!fs.existsSync(outputSwaggerDir)) {
	fs.mkdirSync(outputSwaggerDir);
}
swaggerMerger({ input: config.swaggerFilePath, output: swaggerBuildFilePath });
const swaggerDocument = YAML.load(swaggerBuildFilePath);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// on App start
//onAppStart();


module.exports = app;
