import _Object$assign from "@babel/runtime/core-js/object/assign";
import { createAction } from 'redux-actions';
import routineStages from './routineStages';
export default function createRoutine(typePrefix) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var createActionCreator = function createActionCreator(type) {
    return createAction.apply(void 0, [typePrefix + "/" + type].concat(params));
  };

  return routineStages.reduce(function (result, stage) {
    var _Object$assign2;

    var actionCreator = createActionCreator(stage);
    return _Object$assign(result, (_Object$assign2 = {}, _Object$assign2[stage.toLowerCase()] = actionCreator, _Object$assign2[stage.toUpperCase()] = actionCreator.toString(), _Object$assign2));
  }, createActionCreator(routineStages[0]));
}