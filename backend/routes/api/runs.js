const express = require('express');
const router = express.Router();

/* GET runs listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/runs"
  });
});

module.exports = router;
