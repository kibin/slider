import _ from 'lodash'

import 'index.styl'

import { imgScale, drawImage, listen, getPageX } from 'helpers/common'

const canvas = _.assign(document.createElement(`canvas`), {
  width: 640,
  height: 400,
});
const context = canvas.getContext(`2d`);

document
  .getElementById(`content`)
  .appendChild(canvas);

const state = {};
const image = new Image();

listen(image, `load`, evt => {
  const img = _.first(evt.path);

  _.assign(state, {
    img: imgScale(img, canvas)
  });

  drawImage(context, img, state.img);
});

image.src = `https://40.media.tumblr.com/fec4ee9dadb1f55763813c9eb0061159/tumblr_nwnhovdks21tfs2oyo1_1280.jpg`;

let dragging;

listen(canvas, [`mousedown`, `touchstart`], evt => {
  dragging = true;

  _.assign(state, {
    startX: getPageX(evt),
  });
})

listen(canvas, [`mousemove`, `touchmove`], evt => {
  if (!dragging) return;

  drawImage(context, image, _.assign({}, state.img, {
    x: getPageX(evt) - (state.startX - state.img.x),
  }))
})

listen(canvas, [`mouseup`, `touchend`], evt => {
  dragging = false;

  _.assign(state.img, { x: state.img.x + getPageX(evt) - state.startX });
})
