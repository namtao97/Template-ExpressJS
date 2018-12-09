var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to Template ExpressJS :D'})
});

module.exports = router;
