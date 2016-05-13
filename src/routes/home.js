var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'ehsy.com'
    });
});

router.get('/404', function (req, res, next) {
    res.render('404');
});

router.get('/:channel', function (req, res, next) {
    //if channel exists, render the channel page, otherwise redirect to 404 page
    res.render('channel', {
        channel: req.params.channel
    });
});

module.exports = router;