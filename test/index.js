var Qlock = require('../');
var noop = function() {};
var assert = require('assert');

describe('qlock', function() {
  describe('log', function() {
    it('should log diffs correctly', function(done) {
      var q = new Qlock();
      var waitOne = 700;
      var waitTwo = 300;
      q.log('Starting log', noop);
      setTimeout(function() {
        q.log('event one', function(description, diff) {
          assert(diff >= waitOne);
        });

        setTimeout(function() {
          q.log('event two', function(description, diff) {
            assert(diff >= waitTwo);
            done();
          });
        }, waitTwo);
      }, waitOne);
    });
  });

  describe('reset', function() {
    it('should reset log', function(done) {
        var q = new Qlock();
        var waitReset = 500;
        var waitLog = 250;
        q.log('Starting log', noop);
        setTimeout(function() {
          q.reset();
          setTimeout(function() {
            q.log('event', function(description, diff) {
              // diff should only be since last reset
              assert(diff >= waitLog && diff < waitReset);
              done();
            });
          }, waitLog);
        }, waitReset);
    });
  });

  describe('profile', function() {
    it('should profile', function(done) {
      var q = new Qlock();
      var wait = 1000;
      q.profile('apple', noop);
      setTimeout(function() {
        q.profile('apple', function(name, diff) {
          assert(diff >= wait);
          done();
        });
      }, wait);
    });
  });
});

