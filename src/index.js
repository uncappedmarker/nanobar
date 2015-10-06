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

function createElement (opts, isProgress) {
  var el = document.createElement('div')
  addClass(el, isProgress ? 'nanobarbar' : 'nanobar')
  if (opts.id) el.id = opts.id
  if (opts.className) addClass(el, opts.className)
  return el
}

function newBar (opts, cont) {
  opts = opts || {}
  var el = createElement(opts, true),
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
      el = createElement(opts),
      bars = [],
      i = -1

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
    bars.push(newBar(opts, el))
    el.appendChild(bars[0].el)
  } else {
    // basic multiple bars
    if (typeof opts.bars === 'number') {
      while (++i < opts.bars) {
        bars.push(newBar({}, el))
        el.appendChild(bars[i].el)
      }
    } else if (typeof opts.bars === 'object' && opts.bars !== null) {
      // custom multimple bars
      for (i in opts.bars) {
        bars[i] = newBar(opts.bars[i], el)
        // add as keyname if exists
        if (opts.bars[i].key) {
          bars[opts.bars[i].key] = bars[i]
        }
        el.appendChild(bars[i].el)
      }
    } else {
      throw new Error('invalid options.bars type')
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
