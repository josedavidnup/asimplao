const { Router } = require("express");
const router = Router();

// middlewares
const { authCheck, retailerCheck } = require("../middlewares/auth");

//controllers
const {
  create,
  listAll,
  read,
  update,
  remove,
} = require("../controllers/product");

//routes
router.post("/product", authCheck, retailerCheck, create);
router.get("/products/:count", listAll);
// router.get('/product/:slug', read);
// router.put('/product/:slug', authCheck, retailerCheck, update);
// router.delete('/product/:slug', authCheck, retailerCheck, remove);

module.exports = router;
