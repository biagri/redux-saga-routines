import _Object$keys from "@babel/runtime/core-js/object/keys";
export function bindPromiseCreator(promiseCreator, dispatch) {
  return function (payload) {
    return promiseCreator(payload, dispatch);
  };
}
export default function bindPromiseCreators(promiseCreators, dispatch) {
  if (typeof promiseCreators === 'function') {
    return bindPromiseCreator(promiseCreators, dispatch);
  }

  if (typeof promiseCreators !== 'object' || promiseCreators === null) {
    throw new Error("bindPromiseCreators expected an object or a function, instead received " + (promiseCreators === null ? 'null' : typeof promiseCreators) + ". ");
  }

  var keys = _Object$keys(promiseCreators);

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