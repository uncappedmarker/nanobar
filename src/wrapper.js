(function (exports) {
  exports(null) // this line will be replaced by the file
})(function (mod) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = mod
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], mod)
  } else {
    // Browser globals
    window.nanobar = mod
  }
})
