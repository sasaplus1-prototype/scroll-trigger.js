# scroll-trigger.js

trigger function when scrolling

## Installation

```sh
$ npm install sasaplus1-prototype/scroll-trigger.js
```

## Usage

via `require()`

```js
var scrollTrigger = require('scroll-trigger');
```

via `<script>`

```html
<script src="scroll-trigger.min.js"></script>
```

### Example

```js
var settings = {};

scrollTrigger.initialize();

settings['100'] = scrollTrigger.on(100, function() {
  console.log('100');
  scrollTrigger.off(settings['100']);
});
settings['200'] = scrollTrigger.on(200, function() {
  console.log('200');
  scrollTrigger.off(settings['200']);
});
settings['300'] = scrollTrigger.on(300, function() {
  console.log('300');
  scrollTrigger.off(settings['300']);
  scrollTrigger.finalize();
});
```

## Functions

### initialize()

add listener for onscroll.

### finalize()

remove listener of onscroll.

### off(setting)

- `setting`
  - `Object`

remove listener.

### on(top, callback, invert)

- `top`
  - `Number|Object`
- `callback`
  - `Function`
- `invert`
  - `Boolean`
- `return`
  - `Object`

add listener.

## License

The MIT license.
