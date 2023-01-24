const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');
require('dotenv').config();

// app
const app = express();

//db connection
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err));

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes middleware
readdirSync(path.join(__dirname, './routes')).map((r) =>
  app.use('/api', require('./routes/' + r))
);

// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
