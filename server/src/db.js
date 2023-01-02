require('dotenv').config();
const mongoose = require('mongoose');
const DATABASE = process.env.DATABASE;
//db
mongoose.set('strictQuery', false);
mongoose
  .connect(DATABASE, {})
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB Error => ', err));
