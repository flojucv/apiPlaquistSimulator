const express = require('express');
const router = express.Router();
const actualiteCode = require('../services/actualite');

router.get('/list', async function(req, res, next) {
    try {
        res.json({
            sucess: true,
            data: await actualiteCode.getList()
        });
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
})

module.exports = router;