const express = require('express');
const router = express.Router();
const patchNoteCode = require('../services/patchNote');

router.get('/list', async function(req, res, next) {
    try {
        res.json({
            sucess: true,
            data: await patchNoteCode.getList()
        });
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
})

module.exports = router;