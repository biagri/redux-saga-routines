"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTracking = withTracking;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime/core-js/get-iterator"));

var _routinePromiseWatcherSaga = require("./routinePromiseWatcherSaga");

var _marked2 =
/*#__PURE__*/
_regenerator.default.mark(withTracking);

function withTracking(worker) {
  var _marked, wrappedWorker;

  return _regenerator.default.wrap(function withTracking$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          wrappedWorker = function _ref(action) {
            var trackingId,
                _len,
                args,
                _key,
                _iteratorNormalCompletion,
                _didIteratorError,
                _iteratorError,
                _iterator,
                _step,
                effect,
                _args = arguments;

            return _regenerator.default.wrap(function wrappedWorker$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    trackingId = extractId(action);

                    for (_len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                      args[_key - 1] = _args[_key];
                    }

                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 5;
                    _iterator = (0, _getIterator2.default)(worker(args));

                  case 7:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context.next = 14;
                      break;
                    }

                    effect = _step.value;
                    _context.next = 11;
                    return addTracking(effect, trackingId);

                  case 11:
                    _iteratorNormalCompletion = true;
                    _context.next = 7;
                    break;

                  case 14:
                    _context.next = 20;
                    break;

                  case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](5);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 20:
                    _context.prev = 20;
                    _context.prev = 21;

                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                      _iterator.return();
                    }

                  case 23:
                    _context.prev = 23;

                    if (!_didIteratorError) {
                      _context.next = 26;
                      break;
                    }

                    throw _iteratorError;

                  case 26:
                    return _context.finish(23);

                  case 27:
                    return _context.finish(20);

                  case 28:
                  case "end":
                    return _context.stop();
                }
              }
            }, _marked, this, [[5, 16, 20, 28], [21,, 23, 27]]);
          };

          _marked =
          /*#__PURE__*/
          _regenerator.default.mark(wrappedWorker);
          return _context2.abrupt("return", wrappedWorker);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function addTracking(effect, trackingId) {
  if (effect.type !== "PUT" || trackingId === null) {
    return effect;
  }

  var action = effect.payload.action;
  var trackedAction = (0, _objectSpread3.default)({}, action, (0, _defineProperty2.default)({}, _routinePromiseWatcherSaga.TRACKING, trackingId));
  return (0, _objectSpread3.default)({}, effect, {
    payload: (0, _objectSpread3.default)({}, effect.payload, {
      action: trackedAction
    })
  });
}

function extractId(action) {
  return action ? action[_routinePromiseWatcherSaga.TRACKING] : null;
}

var _default = withTracking;
exports.default = _default;