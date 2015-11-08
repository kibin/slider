import _ from 'lodash'

import 'index.styl'

import { images } from 'helpers/images'
import { scale, drawImg, listen, getLayerX } from 'helpers/common'

const canvas = _.assign(document.createElement(`canvas`), {
  width: 640,
  height: 400,
});
const context = canvas.getContext(`2d`);

document
  .getElementById(`content`)
  .appendChild(canvas);

const state = { images: [], offset: 0 };

const imageNodes = images.map((src, idx) => {
  const image = new Image();

  listen(image, `load`, evt => {
    const img = _.first(evt.path);
    const imageProps = scale(img, context.canvas);

    state.images.push(imageProps);

    drawImg(context, { img, idx, ...imageProps });
  });

  image.src = src;

  return image;
});

let dragging;

listen(canvas, [`mousedown`, `touchstart`], evt => {
  dragging = true;

  const currentX = getLayerX(evt);

  _.assign(state, {
    startX: currentX,
    lastX: currentX,
  });
})

listen(canvas, [`mousemove`, `touchmove`], evt => {
  if (!dragging) return;

  const currentX = getLayerX(evt);
  const currentOffset = currentX - state.lastX;
  const { width, height } = context.canvas;
  const offset = state.offset + currentOffset;

  if (offset >= 0 || offset < -(width * (state.images.length - 1))) {
    return state.lastX = currentX;
  }

  _.assign(state, {
    lastX: currentX,
    offset
  });

  context.clearRect(0, 0, width, height);

  state.images.forEach((image, idx) => {
    _.assign(image, { x: state.images[idx].x + currentOffset });

    drawImg(context, { idx, img: imageNodes[idx], ...image });
  })
});

listen([window, canvas], [`mouseup`, `touchend`], evt => {
  dragging = false;
});
