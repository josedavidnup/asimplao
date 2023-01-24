const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [33, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowecase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
