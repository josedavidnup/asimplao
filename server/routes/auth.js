const { Router } = require('express');
const router = Router();

//controllers
const { createOrUpdateUser, currenUser } = require('../controllers/auth');

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

router.post('/current-user', authCheck, currenUser);

router.post('/current-admin', authCheck, adminCheck, currenUser);

module.exports = router;
