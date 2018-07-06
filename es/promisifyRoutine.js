import _Promise from "@babel/runtime/core-js/promise";
import { ROUTINE_PROMISE_ACTION } from './constants';
export default function promisifyRoutine(routine, options) {
  if (options === void 0) {
    options = {};
  }

  return function (payload, dispatch) {
    return new _Promise(function (resolve, reject) {
      return dispatch({
        type: ROUTINE_PROMISE_ACTION,
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