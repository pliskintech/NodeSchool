"use strict";

function foo () {
  var bar = false;
  function zip() {
    var quux = 5;
    bar = true;
  }
  quux = 6;
  return zip;
}
