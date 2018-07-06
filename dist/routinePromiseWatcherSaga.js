"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRoutinePromiseAction = handleRoutinePromiseAction;
exports.default = routinePromiseWatcherSaga;
exports.TRACKING = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _symbol = _interopRequireDefault(require("@babel/runtime/core-js/symbol"));

var _effects = require("redux-saga/effects");

var _constants = require("./constants");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(handleRoutinePromiseAction),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(routinePromiseWatcherSaga);

var getPayload = function getPayload(data) {
  return data && data.payload || data;
};

var TRACKING = (0, _symbol.default)("tracking");
exports.TRACKING = TRACKING;
var id = 0;

var generateId = function generateId() {
  id++;
  return id;
};

var hasSameTrackingId = function hasSameTrackingId(trackingId) {
  return function (action) {
    var actionId = action.meta && action.meta[TRACKING];
    return actionId === trackingId;
  };
};

function handleRoutinePromiseAction(action) {
  var payload, _action$meta, routine, reduxFormCompatible, _action$meta$defer, resolve, reject, enableTracking, raceEffect, trackingId, trackedAction, _ref, _ref2, _ref2$, success, failure;

  return _regenerator.default.wrap(function handleRoutinePromiseAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = action.payload, _action$meta = action.meta, routine = _action$meta.routine, reduxFormCompatible = _action$meta.reduxFormCompatible, _action$meta$defer = _action$meta.defer, resolve = _action$meta$defer.resolve, reject = _action$meta$defer.reject, enableTracking = _action$meta.options.enableTracking;

          if (enableTracking) {
            trackingId = generateId();
            trackedAction = (0, _objectSpread3.default)({}, routine.trigger(payload), (0, _defineProperty2.default)({}, TRACKING, trackingId));
            raceEffect = (0, _effects.all)([(0, _effects.race)({
              success: (0, _effects.take)([routine.SUCCESS, hasSameTrackingId(trackingId)]),
              failure: (0, _effects.take)([routine.FAILURE, hasSameTrackingId(trackingId)])
            }), (0, _effects.put)(trackedAction)]);
          } else {
            raceEffect = (0, _effects.all)([(0, _effects.race)({
              success: (0, _effects.take)(routine.SUCCESS),
              failure: (0, _effects.take)(routine.FAILURE)
            }), (0, _effects.put)(routine.trigger(payload))]);
          }

          _context.next = 4;
          return raceEffect;

        case 4:
          _ref = _context.sent;
          _ref2 = (0, _slicedToArray2.default)(_ref, 1);
          _ref2$ = _ref2[0];
          success = _ref2$.success;
          failure = _ref2$.failure;

          if (!success) {
            _context.next = 14;
            break;
          }

          _context.next = 12;
          return reduxFormCompatible ? (0, _effects.call)(resolve) : (0, _effects.call)(resolve, getPayload(success));

        case 12:
          _context.next = 16;
          break;

        case 14:
          _context.next = 16;
          return (0, _effects.call)(reject, getPayload(failure));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function routinePromiseWatcherSaga() {
  return _regenerator.default.wrap(function routinePromiseWatcherSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_constants.ROUTINE_PROMISE_ACTION, handleRoutinePromiseAction);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}