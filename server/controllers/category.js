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
  const { name, picture, email } = req.user;
};
exports.read = async (req, res) => {
  const { name, picture, email } = req.user;
};
exports.update = async (req, res) => {
  const { name, picture, email } = req.user;
};
exports.remove = async (req, res) => {
  const { name, picture, email } = req.user;
};
