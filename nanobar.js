(function (exports) {
/* http://nanobar.jacoborus.codes
 * https://github.com/jacoborus/nanobar
 * MIT LICENSE */
'use strict'

var css = '.nanobar{float:left;width:100%;height:4px;z-index:9999;top:0;}.nanobarbar{width:0;height:100%;clear:both;float:left;transition:height .3s;background:#000;}.closing-bar{height:0}'

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function addCss () {
  var s = document.getElementById('nanobar-style')

  if (s === null) {
    s = document.createElement('style')
    s.type = 'text/css'
    s.id = 'nanobar-style'
    document.head.insertBefore(s, document.head.firstChild)
    // the world
    if (!s.styleSheet) return s.appendChild(document.createTextNode(css))
    // IE
    s.styleSheet.cssText = css
  }
}

function addClass (el, className) {
  if (el.classList) el.classList.add(className)
  else el.className += ' ' + className
}

function rmClass (el, className) {
  if (el.classList) el.classList.remove(className)
  else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}

function createElement (opts, isProgress) {
  var el = document.createElement('div')
  addClass(el, isProgress ? 'nanobarbar' : 'nanobar')
  if (opts.id) el.id = opts.id
  if (opts.className) addClass(el, opts.className)
  return el
}

function newLap (opts, remove) {
  var here = 0,
      on = false,
      width = 0,
      el = createElement(opts, true),
      speed = opts.speed || 4

  // set bar width
  function place (num) {
    width = num
    el.style.width = width + '%'
  }

  // animation loop
  function move () {
    var dist = width - here

    if (dist < 0.1 && dist > -0.1) {
      place(here)
      on = false
      if (width === 100) {
        addClass(el, 'closing-bar')
        setTimeout(remove, 300)
      }
    } else {
      place(width - dist / speed)
      setTimeout(go, 16.666)
    }
  }

  function go (num) {
    if (num) {
      here = num
      if (!on) {
        on = true
        move()
      }
    } else if (on) {
      move()
    }
  }

  return {
    el: el,
    go: go
  }
}

function newBar (opts, cont) {
  var bar = newLap(opts, remove),
      oldBar

  cont.appendChild(bar.el)

  function remove () {
    cont.removeChild(oldBar.el)
  }

  return {
    go: function (p) {
      bar.go(p)
      if (p === 100) {
        oldBar = bar
        bar = newLap(opts, remove)
        insertAfter(bar.el, oldBar.el)
      }
    },
    addClass: function (cl) {
      addClass(bar.el, cl)
    },
    removeClass: function (cl) {
      rmClass(bar.el, cl)
    }
  }
}

exports(function (options) {
  var opts = options || {},
      el = createElement(opts),
      bars = [],
      i = -1,
      n = {}

  addCss()
  // set CSS position
  el.style.position = !opts.target ? 'fixed' : 'relative'
  // insert container
  if (!opts.target) {
    document.body.appendChild(el)
  } else {
    opts.target.insertBefore(el, opts.target.firstChild)
  }

  if (!opts.bars) {
    bars.push(newBar({}, el))
  } else {
    // basic multiple bars
    if (typeof opts.bars === 'number') {
      while (++i < opts.bars) bars.push(newBar({}, el))
    } else if (typeof opts.bars === 'object' && opts.bars !== null) {
      // custom multimple bars
      for (i in opts.bars) {
        bars[i] = newBar(opts.bars[i], el)
        n[i] = bars[i]
        // add as keyname if exists
        if (opts.bars[i].key) {
          bars[opts.bars[i].key] = bars[i]
        }
      }
    }
  }

  n.el = el
  n.bars = bars
  n.go = function (p) {
    bars[0].go(p)
  }

  return n
})
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
