'use strict'

var test = require('tape'),
    nanobar = require('..'),
    defNano = nanobar()

test('insert css tag in head', function (t) {
  var cssTag = document.getElementById('nanobar-style')
  t.ok(cssTag)
  t.end()
})

test('default insert nanobar in body', function (t) {
  t.is(defNano.el.parentNode.tagName, 'BODY')
  t.end()
})

test('create default bar if no bars argument passed', function (t) {
  t.is(defNano.bars.length, 1)
  t.is(defNano.el.children[0].parentNode.parentNode.tagName, 'BODY')
  t.end()
})

test('insert nanobar in custom div', function (t) {
  var container = document.createElement('div')
  container.id = 'custom-insert'
  var nano = nanobar({target: container})
  t.is(nano.el.parentNode.id, 'custom-insert')
  t.is(nano.bars.length, 1)
  t.end()
})

test('add simple multiple bars', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({
    target: container,
    bars: 2
  })
  t.is(nano.bars.length, 2)
  t.end()
})

test.skip('throw error on bad opts.bar type', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({
    target: container,
    bars: 2
  })
  t.is(nano.bars.length, 2)
  t.end()
})

test('insert custom bar', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({
    target: container,
    bars: [{
      id: 'id1',
      className: 'class1',
      key: 'key1'
    }]
  })
  t.is(nano.bars.length, 1)
  t.is(nano.el.children[0].id, 'id1')
  t.is(nano.el.children[0].className, 'nanobarbar hidden-bar class1')
  t.is(typeof nano.bars.key1, 'object')
  t.end()
})

test('insert custom multiple bars from array', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({
    target: container,
    bars: [{
      id: 'id1',
      className: 'class1',
      key: 'key1'
    }, {
      id: 'id2',
      className: 'class2',
      key: 'key2'
    }, {
      id: 'id3',
      className: 'class3',
      key: 'key3'
    }]
  })
  t.is(nano.bars.length, 3)
  t.is(nano.el.children[0].id, 'id1')
  t.is(nano.el.children[2].id, 'id3')
  t.is(nano.el.children[0].className, 'nanobarbar hidden-bar class1')
  t.is(nano.el.children[2].className, 'nanobarbar hidden-bar class3')
  t.is(typeof nano.bars.key1, 'object')
  t.is(typeof nano.bars.key3, 'object')
  t.end()
})

test('insert custom multiple bars from object', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({
    target: container,
    bars: [{
      key: 'key1',
      id: 'id1',
      className: 'class1'
    }, {
      key: 'key2',
      id: 'id2',
      className: 'class2'
    }, {
      key: 'key3',
      id: 'id3',
      className: 'class3'
    }]
  })
  t.is(typeof nano.bars.key1, 'object')
  t.is(typeof nano.key1, 'object')
  t.is(typeof nano.bars.key3, 'object')
  t.is(typeof nano.key3, 'object')
  t.is(nano.el.children[0].className, 'nanobarbar hidden-bar class1')
  t.is(nano.el.children[2].className, 'nanobarbar hidden-bar class3')
  t.end()
})

test('move simple bar', function (t) {
  defNano.go(50)
  // comment here
  window.setTimeout(function () {
    t.is(defNano.el.children[0].style.width, '50%')
    t.end()
  }, 400)
})

test('creates a new simple bar when old reachs 100%', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({target: container, className: 'other'})
  nano.go(100)
  window.setTimeout(function () {
    t.ok(nano.el.children[0])
    t.is(nano.el.children[0].style.width, '')
    t.end()
  }, 1000)
})

test('creates a new custom bar when old reachs 100%', function (t) {
  var container = document.createElement('div')
  var nano = nanobar({
    target: container,
    className: 'other',
    bars: {
      one: {
        id: 'one',
        key: 'one'
      },
      two: {
        id: 'two'
      }
    }
  })
  nano.bars.one.go(100)
  window.setTimeout(function () {
    t.ok(nano.el.children[0])
    t.is(nano.el.children[0].style.width, '')
    t.end()
  }, 1500)
})
