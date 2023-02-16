const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error.code);
    res.status(400).send("Create category failed");
    if (error.code) {
      res.status(409).json({
        error: "Product is already created, Try again!",
      });
    } else {
      res.status(400).json({
        error: error.message,
      });
    }
  }
};

exports.listAll = async (req, res) => {
  try {
    const productList = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subCategory")
      .sort([["createAt", "desc"]])
      .exec();
    res.json(productList);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("List product failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product delete failed");
  }
};
