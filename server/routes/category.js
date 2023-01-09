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
} = require('../controllers/category');

//routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
