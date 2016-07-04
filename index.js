'use strict';

var events = require('events'),
    scrollTop = require('scroll-top');

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
  events.off(window, 'scroll', scroll);
}

function initialize() {
  events.on(window, 'scroll', scroll);
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
