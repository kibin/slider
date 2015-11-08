import _ from 'lodash'

import 'index.styl'

import { images } from 'helpers/images'
import { scale, drawImg, listen, getPageX } from 'helpers/common'

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
    const imgName = `img${idx}`;

    state.images.push(scale(img, context.canvas))

    /*setTimeout(µ => */drawImg(context, { img, idx, ...state.images[idx] })/*, 1000 * idx)*/
  });

  image.src = src;

  return image;
});

let dragging;

listen(canvas, [`mousedown`, `touchstart`], evt => {
  dragging = true;

  const currentX = getPageX(evt);

  _.assign(state, {
    startX: currentX,
  });
})

listen(canvas, [`mousemove`, `touchmove`], evt => {
  if (!dragging) return;

  const currentX = getPageX(evt);
  const { width, height } = context.canvas;

  context.clearRect(0, 0, width, height);

  state.images.forEach((image, idx) =>
    drawImg(context, {
      idx,
      img: imageNodes[idx],
      ...{
        ...state.images[idx],
        ...{
          x: getPageX(evt) - (state.startX - state.images[idx].x)
        }
      }
    })
  )
});

listen([canvas, window], [`mouseup`, `touchend`], evt => {
  dragging = false;

  if (evt.currentTarget == window) return;

  state.images.forEach((image, idx) => _.assign(image, {
    x: state.images[idx].x + getPageX(evt) - state.startX
  }));
});
