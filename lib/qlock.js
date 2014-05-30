/**
 * Simple app timestamping 
 */
var qlock = function(opts) {
  opts = opts || {};
  this.mute = opts.mute;
  this.records = {};
};
 
qlock.prototype.log = function(description, cb) {
  if (this.mute) return;
 
  if (!this.timestamp) {
    this.timestamp = new Date();
    if (cb) {
      cb(description);
    } else {
      console.log(description);
    }
    return;
  }
 
  var now = new Date();
  var diff = now - this.timestamp;
  this.timestamp = now;
  if (cb) {
    cb(description, diff);
  } else {
    console.log(description + ' - ' + diff + 'ms');
  }
}
 
qlock.prototype.reset = function() {
  this.timestamp = new Date();
}

qlock.prototype.profile = function(name) {
  if (this.mute) return;

  var start = records[name];

  // End profiling
  if (start) {
    var diff = (new Date()) - start;
    delete records[name];
    return console.log('End "' + name + '" ' + diff + 'ms'); 
  }

  // Start profiling
  records[name] = new Date();
  console.log('Start "' + name + '"');
}

module.exports = qlock;
