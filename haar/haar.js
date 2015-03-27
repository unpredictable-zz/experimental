asr.provide("asr.haar");

asr.haar.average = function(arr) {
  var sum = 0;
  for (var i in arr) {
    sum += arr[i];
  }
  return sum / arr.length;
};

asr.haar.nearestPowerOfTwo = function(len) {
  var padded = 1;
  while (padded < len) {
    padded *= 2;
  }
  return padded;
};

asr.haar.pad = function(arr, size, value) {
  var temp = [].concat(arr);
  for (var i = arr.length; i < size; i++) {
    temp.push(value);
  }
  return temp;
};

asr.haar.encode = function(arr) {
  var step = 1;
  for (var step = 1; step < arr.length; step *= 2) {
    for (var i = 0; i < arr.length; i += 2 * step) {
      var avg = (arr[i] + arr[i + step]) / 2.0;
      var diff = arr[i] - avg;
      arr[i] = avg;
      arr[i + step] = diff;
    }
  }
  var encoded = [arr[0]];
  for (var step = arr.length / 2; step >= 1; step /= 2) {
    for (var i = 0; i < arr.length; i += 2 * step) {
      encoded.push(arr[i + step]);
    }
  }
  return encoded;
};

asr.haar.decode = function(arr) {
  var decoded = [arr[0]];
  var index = 0;
  for (var len = decoded.length; len < arr.length; len *= 2) {
    var decoded_step = [];
    for (var i = 0; i < decoded.length; i++) {
      decoded_step.push(decoded[i] + arr[index + 1]);
      decoded_step.push(decoded[i] - arr[index + 1]);
      index++;
    }
    decoded = decoded_step;
  }
  return decoded;
};
