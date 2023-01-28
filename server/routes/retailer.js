const { Router } = require('express');
const router = Router();

//routes
router.get('/retailer', async (req, res) => {
  res.json({
    data: 'Hey, you hit customer API endpoint',
  });
});

module.exports = router;
