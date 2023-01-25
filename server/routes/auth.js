const { Router } = require('express');
const router = Router();

//controllers
const {
  createOrUpdateCustomer,
  currentCustomer,
} = require('../controllers/auth');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//routes
router.post('/create-or-update-customer', authCheck, createOrUpdateCustomer);

router.post('/current-customer', authCheck, currentCustomer);

router.post('/current-admin', authCheck, adminCheck, currentCustomer);

module.exports = router;
