const { Router } = require('express');
const router = Router();

// middlewares
const { authCheck, retailerCheck } = require('../middlewares/auth');

//controllers
const {
  create,
  list,
  read,
  update,
  remove,
} = require('../controllers/category');

//routes
router.post('/category', authCheck, retailerCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, retailerCheck, update);
router.delete('/category/:slug', authCheck, retailerCheck, remove);

module.exports = router;
