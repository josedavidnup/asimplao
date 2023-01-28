const Subcategory = require('../models/subCategory');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subCategory = await new Subcategory({
      name,
      parent: category,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (error) {
    res.status(400).send('Create Sub category failed');
  }
};

exports.list = async (req, res) => {
  try {
    const subCategoryList = await Subcategory.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.json(subCategoryList);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Sub category list failed');
  }
};

exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    const subCategory = await Subcategory.findOne({ slug }).exec();
    res.json(subCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Sub Category item failed');
  }
};

exports.update = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { slug } = req.params;
    const subUpdatedCategory = await Subcategory.findOneAndUpdate(
      { slug },
      { name, parent: category, slug: slugify(name) },
      { new: true }
    );
    res.json(subUpdatedCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Sub Category update failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const subDeletedCategory = await Subcategory.findOneAndDelete({
      slug,
    }).exec();
    res.json(subDeletedCategory);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Sub Category item failed');
  }
};
