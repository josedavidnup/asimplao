const { Router } = require('express');
const router = Router();

//routes
router.get('/user', async (req, res) => {
  res.json({
    data: 'Hey, you hit user API endpoint',
  });
});

module.exports = router;
