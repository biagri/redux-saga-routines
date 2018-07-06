import _Promise from "@babel/runtime/core-js/promise";
import { ROUTINE_PROMISE_ACTION } from './constants';
export default function bindRoutineToReduxForm(routine, options) {
  if (options === void 0) {
    options = {};
  }

  return function (values, dispatch, props) {
    return new _Promise(function (resolve, reject) {
      return dispatch({
        type: ROUTINE_PROMISE_ACTION,
        payload: {
          values: values,
          props: props
        },
        meta: {
          defer: {
            resolve: resolve,
            reject: reject
          },
          reduxFormCompatible: true,
          routine: routine,
          options: options
        }
      });
    });
  };
}