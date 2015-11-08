export function listen(observables, events, cb) {
  [].concat(events).forEach(evt =>
    [].concat(observables).forEach(observable =>
      observable.addEventListener(evt, cb)
    )
  );
}

export function getX(evt) {
  return _.get(evt, `changedTouches.0.layerX`, evt.layerX);
}
