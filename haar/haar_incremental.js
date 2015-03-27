asr.provide("asr.haar.incr");

asr.haar.incr.Incremental = function() {
  var count = 0;
  var codes = [];
  var setSize = function(size) {
    count = size;
  };
  var addNum = function(num) {
    codes.push(num);
  };
  var getData = function() {
    if (count == 0) {
      return [];
    }
    codes.splice(count);
    var data = [].concat(codes);
    var size = asr.haar.nearestPowerOfTwo(count);
    data = asr.haar.pad(data, size, 0);
    var decoded =  asr.haar.decode(data);
    decoded.splice(count);
    return decoded;
  };
  return {
    'setSize': setSize,
    'addNum': addNum,
    'getData': getData
  };
};
