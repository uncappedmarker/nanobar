'use strict'

var css = '.nanobar{float:left;width:100%;height:4px;z-index:9999;top:0;}.nanobarbar{width:0;height:100%;clear:both;float:left;transition:height .3s;background:#000;}'

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

function createProgress (opts) {
  var el = document.createElement('div')
  addClass(el, 'nanobarbar')
  if (opts.id) el.id = opts.id
  if (opts.className) addClass(el, opts.className)
  return el
}

function newBar (opts, cont) {
  opts = opts || {}
  var el = createProgress(opts),
      width = 0,
      here = 0,
      moving = false

  // set bar width
  function place (num) {
    width = num
    el.style.width = width + '%'
  }

  function remove () {
    cont.removeChild(el)
  }
  // animation loop
  function move () {
    var dist = width - here

    if (dist < 0.1 && dist > -0.1) {
      place(here)
      moving = false
      if (width === 100) {
        el.style.height = 0
        setTimeout(remove, 300)
      }
    } else {
      place(width - dist / 4)
      setTimeout(go, 16)
    }
  }

  function go (num) {
    if (num) {
      here = num
      if (!moving) {
        moving = true
        move()
      }
    } else if (moving) {
      move()
    }
  }

  return {
    el: el,
    go: go
  }
}

function nanobar (options) {
  var opts = options || {},
      bars = [],
      el = document.createElement('div'),
      i

  addClass(el, 'nanobar')
  addCss()
  if (opts.id) el.id = opts.id
  // set CSS position
  el.style.position = !opts.target ? 'fixed' : 'relative'
  // insert container
  if (!opts.target) {
    document.body.appendChild(el)
  } else {
    opts.target.insertBefore(el, opts.target.firstChild)
  }

  if (!opts.bars) {
    bars.push(newBar(opts, el))
    el.appendChild(bars[0].el)
  } else {
    for (i in bars) {
      bars.push(newBar(opts.bars[i], el))
      el.appendChild(bars[i].el)
    }
  }

  function go (p) {
    if (bars.length === 1) {
      // expand bar
      bars[0].go(p)

      // create new bar at progress end
      if (p === 100) {
        // create and insert bar in DOM and this.bars array
        bars[0] = newBar({}, el)
        el.appendChild(bars[0].el)
      }
    }
  }

  return {
    el: el,
    bars: bars,
    go: go
  }
}

module.exports = nanobar

