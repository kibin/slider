export function center(parent, child) {
  return (parent - child) / 2;
}

export function imgScale(
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

export function drawImage(context, img, { x, y, w, h }) {
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);

  context.drawImage(img, x, y, w, h);
}
