var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
    var cid = req.query.cid;

    if (cid) {
        res.render('product-list', {
            cid: cid
        });
    }
    else {
        res.redirect('/404');
    }
});

router.get('/detail', function (req, res, next) {
    var pid = req.query.pid;

    if (pid) {
        res.render('product-detail', {
            pid: pid
        });
    }
    else {
        res.redirect('/404');
    }
});

module.exports = router;