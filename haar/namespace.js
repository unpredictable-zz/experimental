var asr = asr || {};

asr.provide = function(name) {
  var parts = name.split(".");
  var obj = window;
  for (var i in parts) {
    obj[parts[i]] = obj[parts[i]] || {};
    obj = obj[parts[i]];
  }
};
