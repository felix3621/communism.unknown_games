const express = require('express');
const auth = require('../modules/authentication.cjs');
const fa = require('../modules/fileAccess.cjs');
const router = express.Router();

router.use(auth.checkUserMiddleware)

router.get('/changelog', (req, res) => {
    try {
        res.json(JSON.parse(fa.read('./shared/changelog.json')));
    } catch (e) {
        res.json([]);
    }
})

router.get('/characters', (req, res) => {
    try {
        res.json(JSON.parse(fa.read('./shared/characters.json')));
    } catch (e) {
        res.json([]);
    }
})

router.get('/games', (req, res) => {
    try {
        res.json(JSON.parse(fa.read('./shared/games.json')));
    } catch (e) {
        res.json([]);
    }
})

module.exports = router;