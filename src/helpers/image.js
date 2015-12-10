export function center(parent, child) {
  return (parent - child) / 2;
}

export function scale(
  { width: iw, height: ih },
  { width: cw, height: ch },
) {
  const stretch = Math.min(cw / iw, ch / ih, 1);
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
