const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
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
    parent: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subcategory', subCategorySchema);
