const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error.code);
    // res.status(400).send('Create category failed');
    if (error.code) {
      // run some code here //
      res.status(409).json({
        error: 'Product is already created, Try again!',
      });
    } else {
      res.status(400).json({
        error: error.message,
      });
    }
  }
};

exports.list = async (req, res) => {
  try {
    const productList = await Product.find({}).populate('category');
    res.json(productList);
  } catch (error) {
    console.log(error.message);
    res.status(400).send('List product failed');
  }
};
