const { Router } = require("express");
const router = Router();

// middlewares
const { authCheck, retailerCheck } = require("../middlewares/auth");

//controllers
const { upload, remove } = require("../controllers/cloudinary.js");

router.post("/uploadimages", authCheck, retailerCheck, upload);
router.post("/removeimages", authCheck, retailerCheck, remove);

module.exports = router;
