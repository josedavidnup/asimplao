const { Router } = require('express');
const router = Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//controllers
const {
  create,
  list,
  read,
  update,
  remove,
} = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products', list);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;
