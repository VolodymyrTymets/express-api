const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const SwaggerExpress = require('swagger-express-mw');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const bodyParser = require('body-parser');
const { config } = require('./config');
const api = require('./src/api/index');
const { passport } = require('./src/passport');
const { mongoManager } = require('./src/mongo');
const { onAppStart } = require('./on-start');

const swaggerDocument = YAML.load('./swagger/swagger.yaml');

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

// api routes v1
app.use('/api/v1', api(config));


// register api doc
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
SwaggerExpress.create({
	appRoot: __dirname,
	swaggerFile:path.resolve(__dirname, './swagger/swagger.yaml'),
}, (err, swaggerExpress) => {
	if (err) { throw err; }
	swaggerExpress.register(app);
});

// on App start
//onAppStart();

module.exports = app;
