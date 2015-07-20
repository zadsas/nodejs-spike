var app  = require(__dirname + '/../app.js');
var should = require('chai').should();
var request = require('supertest');
var nock = require('nock');

var server;
var port = 3333;

var externalService = nock('http://localhost:8888')
                .get('/number')
                .reply(200, {number: '42'});

describe('Nodejs spike', function () {

  before (function (done) {
    server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  after(function (done) {
    server.close();
    done();
  });

  it('should be listening at localhost:3333', function (done) {
    request(app)
    .get("/")
    .expect(200)
    done();
  });

  it('should display number 42', function (done) {
    request(app)
    .get("/")
    .end(function(err, res) {
      res.text.should.contain("42")
      done();
    });
  });

});
