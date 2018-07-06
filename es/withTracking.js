import _extends from "@babel/runtime/helpers/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _getIterator from "@babel/runtime/core-js/get-iterator";

var _marked2 =
/*#__PURE__*/
_regeneratorRuntime.mark(withTracking);

import { TRACKING } from "./routinePromiseWatcherSaga";
export function withTracking(worker) {
  var _marked, wrappedWorker;

  return _regeneratorRuntime.wrap(function withTracking$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          wrappedWorker = function _ref2(action) {
            var trackingId,
                _len,
                args,
                _key,
                _iterator,
                _isArray,
                _i,
                _ref,
                effect,
                _args = arguments;

            return _regeneratorRuntime.wrap(function wrappedWorker$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    trackingId = extractId(action);

                    for (_len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      args[_key - 1] = _args[_key];
                    }

                    _iterator = worker(args), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);

                  case 3:
                    if (!_isArray) {
                      _context.next = 9;
                      break;
                    }

                    if (!(_i >= _iterator.length)) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt("break", 18);

                  case 6:
                    _ref = _iterator[_i++];
                    _context.next = 13;
                    break;

                  case 9:
                    _i = _iterator.next();

                    if (!_i.done) {
                      _context.next = 12;
                      break;
                    }

                    return _context.abrupt("break", 18);

                  case 12:
                    _ref = _i.value;

                  case 13:
                    effect = _ref;
                    _context.next = 16;
                    return addTracking(effect, trackingId);

                  case 16:
                    _context.next = 3;
                    break;

                  case 18:
                  case "end":
                    return _context.stop();
                }
              }
            }, _marked, this);
          };

          _marked =
          /*#__PURE__*/
          _regeneratorRuntime.mark(wrappedWorker);
          return _context2.abrupt("return", wrappedWorker);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function addTracking(effect, trackingId) {
  var _extends2;

  if (effect.type !== "PUT" || trackingId === null) {
    return effect;
  }

  var action = effect.payload.action;

  var trackedAction = _extends({}, action, (_extends2 = {}, _extends2[TRACKING] = trackingId, _extends2));

  return _extends({}, effect, {
    payload: _extends({}, effect.payload, {
      action: trackedAction
    })
  });
}

function extractId(action) {
  return action ? action[TRACKING] : null;
}

export default withTracking;