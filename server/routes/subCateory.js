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
} = require('../controllers/subCategory');

//routes
router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategories', list);
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.delete('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
