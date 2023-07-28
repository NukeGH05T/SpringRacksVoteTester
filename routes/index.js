var express = require('express');
var router = express.Router();
var votifier = require('votifier-send');
var config = require('../config/config')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SpringRacks Vote Tester' });
});

router.post('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var settings = {
    key: req.body.publicKey,
    host: req.body.host,
    port: req.body.port,
    data: {
      user: req.body.username,
      site: "SpringRacks.com",
      addr: ip,
      timestamp: new Date().getTime()
    }
  }

  votifier.send(settings, (err) => {
    if(err) console.log(err);

    console.log(req.body)
    res.status(200).send("OK")
  })


})

module.exports = router;
