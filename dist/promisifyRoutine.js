"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promisifyRoutine;

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _constants = require("./constants");

function promisifyRoutine(routine) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (payload, dispatch) {
    return new _promise.default(function (resolve, reject) {
      return dispatch({
        type: _constants.ROUTINE_PROMISE_ACTION,
        payload: payload,
        meta: {
          defer: {
            resolve: resolve,
            reject: reject
          },
          routine: routine,
          options: options
        }
      });
    });
  };
}