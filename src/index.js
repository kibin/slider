import _ from 'lodash'

import 'index.styl'

import dragHandler from 'modules/drag_handler'
import imagesRenderer from 'modules/images_renderer'

const canvas = _.assign(document.createElement(`canvas`), {
  width: 640,
  height: 400,
});
const state = { images: [], offset: 0 };
const imageNodes = imagesRenderer(state, canvas);

dragHandler(canvas, state, imageNodes);

document.getElementById(`content`).appendChild(canvas);
