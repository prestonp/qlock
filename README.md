qlock
=====

Quick and dirty timestamping.

### Install

npm install qlock

### Usage

How to log the lifecycle of a series of complex operations:

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

Use `profile()` to measure a single event. Note that this
requires two calls to start and end the event.

```javascript
qlk.profile('getUser');
getUser(45, function(err, user) {
  qlk.profile('getUser');
});
```

Which prints:

```shell
Start "getUser"
End "getUser" 309ms
```

### API

#### new qlock(opts)

Instantiates a new qlock logger. For production use, it's recommended to mute qlock, which effectively turns all
functionality into no-ops.

* `opts` - An object containing instantiation options 
  * `mute` - Pass in a truthy value to mute qlock.

===

#### log(description, [callback]) ##

This method is used to log consecutive events. The first `log()` will initiate the first timestamp whereas
consecutive calls to `log()` will log the timestamp difference since the last event.
  
**Arguments**

* `description` - A description of the event being logged
* `callback(description, diff)` - An optional callback function to customize logging behavior. The `diff` measures
  time since last event in milliseconds. Omitting this callback will simply print the description and diff to 
  the console.

===

#### reset()

Resets the timestamp for `log()`, the following `log()` will be relative to when this is invoked.

===

#### profile(name) 

Profile a single event by a __unique__ name. The first `profile()` will start recording , while the second
will end it. Ensure that all profiled events are ended otherwise it could leak memory if events just
pile up and never get completed.

**Arguments**

* `name` - A string to index an event.

===

### License

The MIT License (MIT)

Copyright (c) 2014 Preston Pham

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
