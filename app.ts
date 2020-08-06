
// Setup .env file configuration.
require('dotenv').config();

// Express and Node.js server.
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Response } from "express";

const app = express();
const port = 8080;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 11 minute
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(express.json());
app.use(limiter);

// Express Router and Routes
const routes = require('./routes');
app.use('/api', routes);

// Swagger Documentation
import { swaggerSettings } from './swagger-config';
const swaggerConfig = swaggerSettings
const expressSwagger = require('../node_modules/express-swagger-generator')(app);
expressSwagger(swaggerConfig)

// Spin up server.
app.listen(process.env.PORT || port);

app.use(function(err, res: Response) {
  if(err) console.log(JSON.stringify(err));
  res.send(JSON.stringify(err.body));
});
