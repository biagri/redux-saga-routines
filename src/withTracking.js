import { TRACKING } from "./routinePromiseWatcherSaga";

export function* withTracking(worker) {
  function* wrappedWorker(action, ...args) {
    const trackingId = extractId(action);
    for (const effect of worker(args)) {
      yield addTracking(effect, trackingId);
    }
  }

  return wrappedWorker;
}

function addTracking(effect, trackingId) {
  if (effect.type !== "PUT" || trackingId === null) {
    return effect;
  }

  const {
    payload: { action },
  } = effect;

  const trackedAction = {
    ...action,
    [TRACKING]: trackingId,
  };

  return {
    ...effect,
    payload: {
      ...effect.payload,
      action: trackedAction,
    },
  };
}

function extractId(action) {
  return action ? action[TRACKING] : null;
}

export default withTracking;
