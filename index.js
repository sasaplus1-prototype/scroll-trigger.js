'use strict';

var eventListener = require('event-listener'),
    scrollTop = require('scroll-top');

var settings = [];

function scroll(event) {
  var top = scrollTop.get(),
      i, len, setting;

  for (i = 0, len = settings.length; i < len; ++i) {
    setting = settings[i];

    if (setting && setting.invert) {
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

function on(top, callback, invert) {
  var setting;

  if (top !== null && typeof top === 'object') {
    setting = top;
  } else {
    setting = {
      top: top,
      callback: callback,
      invert: invert
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
