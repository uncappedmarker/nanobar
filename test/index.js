'use strict'

var test = require('tape'),
    nanobar = require('../src/index.js')

var defNano = nanobar()

window.nano = defNano
test('nanobar:: insert css tag in head', function (t) {
  var cssTag = document.getElementById('nanobar-style')
  t.ok(cssTag)
  t.end()
})

test('nanobar:: default insert nanobar in body', function (t) {
  t.is(defNano.el.parentNode.tagName, 'BODY')
  t.end()
})

test('nanobar:: create default bar if no bars argument passed', function (t) {
  t.is(defNano.bars.length, 1)
  t.is(defNano.bars[0].el.parentNode.parentNode.tagName, 'BODY')
  t.end()
})

test('nanobar:: insert nanobar in custom div', function (t) {
  var container = document.createElement('div')
  container.id = 'custom-insert'
  var nano = nanobar({target: container})
  t.is(nano.el.parentNode.id, 'custom-insert')
  t.end()
})

