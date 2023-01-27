const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    res.status(400).send('Create category failed');
  }
};

exports.list = async (req, res) => {
  try {
    const categoryList = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(categoryList);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('List category failed');
  }
};

exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug }).exec();
    res.json(category);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Category item failed');
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;
    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Category update failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedCategory = await Category.findOneAndDelete({ slug }).exec();
    res.json(deletedCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Category item failed');
  }
};
