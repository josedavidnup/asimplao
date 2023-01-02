const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');
// app
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes middleware
// app.use('/api', authRoutes);
readdirSync(path.join(__dirname, './routes')).map((r) =>
  app.use('/api', require('./routes/' + r))
);

module.exports = app;
