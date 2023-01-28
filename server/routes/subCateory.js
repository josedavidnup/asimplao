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
} = require('../controllers/subCategory');

//routes
router.post('/subcategory', authCheck, retailerCheck, create);
router.get('/subcategories', list);
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, retailerCheck, update);
router.delete('/subcategory/:slug', authCheck, retailerCheck, remove);

module.exports = router;
