const express = require('express');
const auth = require('../modules/authentication.cjs');
const fa = require('../modules/fileAccess.cjs');
const router = express.Router();


router.get('/changelog', auth.checkUserMiddleware, (req, res) => {
    try {
        res.json(JSON.parse(fa.read('./changelog.json')));
    } catch (e) {
        res.json([]);
    }
})

router.get('/characters', auth.checkUserMiddleware, (req, res) => {
    try {
        res.json(JSON.parse(fa.read('./characters.json')));
    } catch (e) {
        res.json([]);
    }
})

module.exports = router;