![nanobar](https://raw.githubusercontent.com/jacoborus/nanobar/master/brand/nanobar.png 'nanobar logo')
=======================================================================================================

1kb dependency-free hackable progress bars.

For iE7+ and the rest of the world

## Demo

See [nanobar.jacoborus.codes](http://nanobar.jacoborus.codes)

## Examples

### Single bar

```js
// generate bar
var bar = nanobar()
// expand bar to 50%
bar.go(50)
```

### Multiple bars

```js
var options = {
  id: 'mynano',
  target: document.getElementById('myDivId'),
  bars: [{
    id: 'primary-bar',
    key: 'primary'
  }, {
    className: 'secondary',
    key: 'secondary'
  }]
};

var bars = nanobar(options);

// expand primary bar
bars.primary.go( 30 ); // size bar 30%
// expand secondary bar
bars.secondary.go(50)
// add a class to a bar
bars.primary.addClass('active')
// remove a class from a bar
bars.primary.removeClass('active')
// end progress bar (and create a new one)
bars.primary.go(100);
```

## Installation

Download and extract the last release from [here](https://github.com/jacoborus/nanobar/archive/master.zip) or install with package manager:

[Bower](http://bower.io/search/?q=nanobar):

```
$ bower install nanobar
```

[npm](https://www.npmjs.org/package/nanobar):

```
$ npm install nanobar
```


## Usage

### Load

Link `nanobar.js` from your html file

```html
<script src="path/to/nanobar.min.js"></script>
```

or require it

```js
var nanobar = require('nanobar');
```

### Generate bars container

```js
var nanobar = new Nanobar( options );
```

#### Options

- `id` `<String>`: id for **nanobar** div container
- `className` `<String>`: class for **nanobar**  div container
- `target` `<DOM Element>`: Where to put **nanobar**  div container, it will be fixed to top of document if `target` evals to false
- `bars` `<Array>`: bars settings

##### bar settings:

- `id` `<String>`: id for bar element
- `className` `<String>`: class for bar element
- `speed` `<Number>`: 0 to 10. Default speed: 3. (0 is the fastest)
- `key` `<String>`: bar keyname

### Bar methods

#### Single bar

```js
var singleBar = nanobar()
```

##### Expand

```js
singleBar.go(50)
```

##### add and remove class

```js
// add a class
singlebar.addclass(50)
// remove a class
singlebar.removeclass(50)
```

#### Multiple bars

```js
var bars = nanobar({
  bars: [{
    key: 'keyOne'
  }, {
    key: 'keyTwo'
  }]
})
```

##### Expand

```js
bars.keyOne.go(50)
// or
bars[0].go(50)
```

##### add and remove class

```js
// add a class
bars.keyOne.addclass(50)
// remove a class
bars.keyOne.removeclass(50)
```

<br><br>

---

© 2015 [jacoborus](https://github.com/jacoborus) - Released under [MIT License](https://raw.github.com/jacoborus/nanobar/master/LICENSE)
