"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRoutine;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _assign = _interopRequireDefault(require("@babel/runtime/core-js/object/assign"));

var _reduxActions = require("redux-actions");

var _routineStages = _interopRequireDefault(require("./routineStages"));

function createRoutine(typePrefix) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var createActionCreator = function createActionCreator(type) {
    return _reduxActions.createAction.apply(void 0, ["".concat(typePrefix, "/").concat(type)].concat(params));
  };

  return _routineStages.default.reduce(function (result, stage) {
    var _Object$assign2;

    var actionCreator = createActionCreator(stage);
    return (0, _assign.default)(result, (_Object$assign2 = {}, (0, _defineProperty2.default)(_Object$assign2, stage.toLowerCase(), actionCreator), (0, _defineProperty2.default)(_Object$assign2, stage.toUpperCase(), actionCreator.toString()), _Object$assign2));
  }, createActionCreator(_routineStages.default[0]));
}