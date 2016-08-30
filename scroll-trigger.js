/*!
 * @license scroll-trigger.js Copyright(c) 2016 sasa+1
 * https://github.com/sasaplus1-prototype/scroll-trigger.js
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrollTrigger"] = factory();
	else
		root["scrollTrigger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eventListener = __webpack_require__(1),
	    scrollTop = __webpack_require__(2);

	var settings = [];

	function scroll(event) {
	  var top = scrollTop.get(),
	      i, len, setting;

	  for (i = 0, len = settings.length; i < len; ++i) {
	    setting = settings[i];

	    if (setting.reverse) {
	      (setting.top >= top) && setting.callback(event);
	    } else {
	      (setting.top < top) && setting.callback(event);
	    }
	  }
	}

	function finalize() {
	  eventListener.off(window, 'scroll', scroll);
	}

	function initialize() {
	  eventListener.on(window, 'scroll', scroll);
	}

	function off(setting) {
	  var i, len;

	  for (i = 0, len = settings.length; i < len; ++i) {
	    if (settings[i] === setting) {
	      return settings.splice(i, 1);
	    }
	  }
	}

	function on(top, callback, reverse) {
	  var setting;

	  if (top !== null && typeof top === 'object') {
	    setting = top;
	  } else {
	    setting = {
	      top: top,
	      callback: callback,
	      reverse: reverse
	    };
	  }

	  settings.push(setting);

	  return setting;
	}

	module.exports = {
	  finalize: finalize,
	  initialize: initialize,
	  off: off,
	  on: on
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var off = (typeof removeEventListener !== 'undefined') ?
	  function off(element, eventName, callback, capture) {
	    return element.removeEventListener(eventName, callback, capture);
	  } :
	  function off(element, eventName, callback) {
	    return element.detachEvent('on' + eventName, callback);
	  };

	var on = (typeof addEventListener !== 'undefined') ?
	  function on(element, eventName, callback, capture) {
	    return element.addEventListener(eventName, callback, capture);
	  } :
	  function on(element, eventName, callback) {
	    return element.attachEvent('on' + eventName, callback);
	  };

	function once(element, eventName, callback, capture) {
	  var handler = function() {
	    off(element, eventName, handler, capture);

	    switch (arguments.length) {
	      case 0:
	        return callback.call(this);
	      case 1:
	        return callback.call(this, arguments[0]);
	      case 2:
	        return callback.call(this, arguments[0], arguments[1]);
	      case 3:
	        return callback.call(this, arguments[0], arguments[1], arguments[2]);
	      default:
	        return callback.apply(this, arguments);
	    }
	  };

	  return on(element, eventName, handler, capture);
	}

	module.exports = {
	  off: off,
	  on: on,
	  once: once
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var db, dd;

	function get() {
	  var result;

	  if (window.pageYOffset !== void 0) {
	    result = window.pageYOffset;
	  } else {
	    db || (db = document.body);
	    dd || (dd = document.documentElement);

	    result = dd.scrollTop || db.parentNode.scrollTop || db.scrollTop;
	  }

	  return result;
	}

	function set(value) {
	  db || (db = document.body);
	  dd || (dd = document.documentElement);

	  db.scrollTop = value;
	  dd.scrollTop = value;
	}

	module.exports = {
	  get: get,
	  set: set
	};


/***/ }
/******/ ])
});
;