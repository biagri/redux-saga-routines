import _regeneratorRuntime from "@babel/runtime/regenerator";
import _extends from "@babel/runtime/helpers/extends";
import _Symbol from "@babel/runtime/core-js/symbol";

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(handleRoutinePromiseAction),
    _marked2 =
/*#__PURE__*/
_regeneratorRuntime.mark(routinePromiseWatcherSaga);

import { takeEvery, take, race, put, call, all } from "redux-saga/effects";
import { ROUTINE_PROMISE_ACTION } from "./constants";

var getPayload = function getPayload(data) {
  return data && data.payload || data;
};

export var TRACKING = _Symbol("tracking");
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

export function handleRoutinePromiseAction(action) {
  var payload, _action$meta, routine, reduxFormCompatible, _action$meta$defer, resolve, reject, enableTracking, raceEffect, _extends2, trackingId, trackedAction, _ref, _ref$, success, failure;

  return _regeneratorRuntime.wrap(function handleRoutinePromiseAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = action.payload, _action$meta = action.meta, routine = _action$meta.routine, reduxFormCompatible = _action$meta.reduxFormCompatible, _action$meta$defer = _action$meta.defer, resolve = _action$meta$defer.resolve, reject = _action$meta$defer.reject, enableTracking = _action$meta.options.enableTracking;

          if (enableTracking) {
            trackingId = generateId();
            trackedAction = _extends({}, routine.trigger(payload), (_extends2 = {}, _extends2[TRACKING] = trackingId, _extends2));
            raceEffect = all([race({
              success: take([routine.SUCCESS, hasSameTrackingId(trackingId)]),
              failure: take([routine.FAILURE, hasSameTrackingId(trackingId)])
            }), put(trackedAction)]);
          } else {
            raceEffect = all([race({
              success: take(routine.SUCCESS),
              failure: take(routine.FAILURE)
            }), put(routine.trigger(payload))]);
          }

          _context.next = 4;
          return raceEffect;

        case 4:
          _ref = _context.sent;
          _ref$ = _ref[0];
          success = _ref$.success;
          failure = _ref$.failure;

          if (!success) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return reduxFormCompatible ? call(resolve) : call(resolve, getPayload(success));

        case 11:
          _context.next = 15;
          break;

        case 13:
          _context.next = 15;
          return call(reject, getPayload(failure));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
export default function routinePromiseWatcherSaga() {
  return _regeneratorRuntime.wrap(function routinePromiseWatcherSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(ROUTINE_PROMISE_ACTION, handleRoutinePromiseAction);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}