qlock
=====

Quick and dirty timestamping.

#### Install

npm install qlock

#### Usage

Logging lifecycle of complex operations:

```javascript
var Qlock = require('qlock');
var qlk = new Qlock();

qlk.log('Starting log');
foo(function(err, result) {
  qlk.log('foo completed');
  bar(function(err, result) {
    qlk.log('bar completed');
  });
});
```

Prints to console:

```shell
Starting log
foo completed - 23ms
bar completed - 443ms
```

Or profile a single event

```javascript
qlk.profile('getUser');
getUser(45, function(err, user) {
  qlk.profile('getUser');
});
```

Which prints:

```shell
Starting "getUser"
Ending "getUser" 309ms
```

#### API

* __log(description, [callback])__ - The first `log()` will initiate the first timestamp. Use 
  the optional `callback(description, diff)` to customize logging behavior. Otherwise it simply
  prints to console.
* __reset()__ - Resets the timestamp, the following `log()` will be relative to when this is invoked..
* __profile(name)__ - Profile a single event by a __unique__ name. The first call will start , while the second
  will end it.
