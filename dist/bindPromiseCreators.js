"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindPromiseCreator = bindPromiseCreator;
exports.default = bindPromiseCreators;

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function bindPromiseCreator(promiseCreator, dispatch) {
  return function (payload) {
    return promiseCreator(payload, dispatch);
  };
}

function bindPromiseCreators(promiseCreators, dispatch) {
  if (typeof promiseCreators === 'function') {
    return bindPromiseCreator(promiseCreators, dispatch);
  }

  if ((0, _typeof2.default)(promiseCreators) !== 'object' || promiseCreators === null) {
    throw new Error("bindPromiseCreators expected an object or a function, instead received ".concat(promiseCreators === null ? 'null' : (0, _typeof2.default)(promiseCreators), ". "));
  }

  var keys = (0, _keys.default)(promiseCreators);
  var boundPromiseCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promiseCreator = promiseCreators[key];

    if (typeof promiseCreator === 'function') {
      boundPromiseCreators[key] = bindPromiseCreator(promiseCreator, dispatch);
    }
  }

  return boundPromiseCreators;
}