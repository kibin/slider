import { listen, getX } from 'helpers/common'
import { drawImg } from 'helpers/image'

export default function initDrag(canvas, state, images) {
  listen(canvas, [`mousedown`, `touchstart`], evt => {
    state.dragging = true;

    _.assign(state, { lastX: getX(evt) });
  })

  listen(canvas, [`mousemove`, `touchmove`], evt => {
    if (!state.dragging) return;

    const currentX = getX(evt);
    const currentOffset = currentX - state.lastX;
    const { width, height } = evt.target;
    const offset = state.offset + currentOffset;
    const context = evt.target.getContext('2d');

    if (offset > 0 || offset < -(width * (state.images.length - 1))) {
      return state.lastX = currentX;
    }

    _.assign(state, { offset, lastX: currentX });

    context.clearRect(0, 0, width, height);

    state.images.forEach((image, idx) => {
      drawImg(context, { idx, img: images[idx],
        ..._.assign(image, { x: state.images[idx].x + currentOffset })
      });
    })
  });

  listen([window, canvas], [`mouseup`, `touchend`], evt => {
    state.dragging = false;
  });
}
