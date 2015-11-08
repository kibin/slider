export function center(parent, child) {
  return (parent - child) / 2;
}

export function scale(
  { width: iw, height: ih },
  { width: cw, height: ch },
) {
  let [ws, hs] = [cw / iw, ch / ih];
  const stretch = ws < hs ? ws : hs;
  const dims = {
    w: iw * stretch,
    h: ih * stretch,
  };

  return {
    ...dims,
    x: center(cw, dims.w),
    y: center(ch, dims.h),
  }
}

export function drawImg(context, { idx, img, x, y, w, h }) {
  const { width, height } = context.canvas;

  context.drawImage(img, x + idx * width, y, w, h);
}

export function listen(observables, events, cb) {
  [].concat(events).forEach(evt =>
    [].concat(observables).forEach(observable =>
      observable.addEventListener(evt, cb)
    )
  );
}

export function getPageX(evt) {
  return _.get(evt, `changedTouches.0.pageX`, evt.pageX);
}
