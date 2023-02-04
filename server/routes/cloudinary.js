const { Router } = require('express');
const router = Router();

// middlewares
const { authCheck, retailerCheck } = require('../middlewares/auth');

//controllers
const { upload, remove } = require('../controllers/cloudinary.js');

router.post('/uploadImages', authCheck, retailerCheck, upload);
router.post('/removeImages', authCheck, retailerCheck, remove);

module.exports = router;
