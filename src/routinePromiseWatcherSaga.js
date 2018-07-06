import { takeEvery, take, race, put, call, all } from "redux-saga/effects";
import { ROUTINE_PROMISE_ACTION } from "./constants";

const getPayload = data => (data && data.payload) || data;

export const TRACKING = Symbol("tracking");

let id = 0;
const generateId = () => {
  id++;
  return id;
};

const hasSameTrackingId = trackingId => action => {
  const actionId = action.meta && action.meta[TRACKING];
  return actionId === trackingId;
};

export function* handleRoutinePromiseAction(action) {
  const {
    payload,
    meta: {
      routine,
      reduxFormCompatible,
      defer: { resolve, reject },
      options: { enableTracking },
    },
  } = action;

  let raceEffect;
  if (enableTracking) {
    const trackingId = generateId();
    const trackedAction = {
      ...routine.trigger(payload),
      [TRACKING]: trackingId,
    };
    raceEffect = all([
      race({
        success: take([routine.SUCCESS, hasSameTrackingId(trackingId)]),
        failure: take([routine.FAILURE, hasSameTrackingId(trackingId)]),
      }),
      put(trackedAction),
    ]);
  } else {
    raceEffect = all([
      race({
        success: take(routine.SUCCESS),
        failure: take(routine.FAILURE),
      }),
      put(routine.trigger(payload)),
    ]);
  }

  const [{ success, failure }] = yield raceEffect;

  if (success) {
    yield reduxFormCompatible ? call(resolve) : call(resolve, getPayload(success));
  } else {
    yield call(reject, getPayload(failure));
  }
}

export default function* routinePromiseWatcherSaga() {
  yield takeEvery(ROUTINE_PROMISE_ACTION, handleRoutinePromiseAction);
}
