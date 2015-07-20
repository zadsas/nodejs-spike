var express = require('express');
var Client = require('node-rest-client').Client;
var router = express.Router();

var client = new Client();

/* GET home page. */
router.get('/', function(req, res, next) {
  client.get("http://localhost:8888/number", function(data, response){
    res.render('index', { title: 'Express', number: data.number});
  });
});

module.exports = router;
