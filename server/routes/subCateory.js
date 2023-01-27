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
router.post('/subCategory', authCheck, adminCheck, create);
router.get('/subCategories', list);
router.get('/subCategory/:slug', read);
router.put('/subCategory/:slug', authCheck, adminCheck, update);
router.delete('/subCategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
