import _ from 'lodash'

import 'index.styl'

import { imgScale, drawImage } from 'helpers/common'

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

image.addEventListener(`load`, evt => {
  const img = _.first(evt.path);

  _.assign(state, {
    img: imgScale(img, canvas)
  });

  drawImage(context, img, state.img);
});

image.src = `https://40.media.tumblr.com/fec4ee9dadb1f55763813c9eb0061159/tumblr_nwnhovdks21tfs2oyo1_1280.jpg`;

let mousedown;

canvas.addEventListener(`mousedown`, evt => {
  mousedown = true;

  _.assign(state, {
    mouseStart: evt.pageX,
  });
})

canvas.addEventListener(`mousemove`, evt => {
  if (!mousedown) return;

  drawImage(context, image, _.assign({}, state.img, {
    x: evt.pageX - (state.mouseStart - state.img.x),
  }))
})

canvas.addEventListener(`mouseup`, evt => {
  mousedown = false;

  _.assign(state.img, { x: state.img.x + evt.pageX - state.mouseStart });
})
