import { listen } from 'helpers/common'
import { images } from 'helpers/images_mock'
import { scale, drawImg } from 'helpers/image'

export default function(state, canvas) {
  const context = canvas.getContext(`2d`);

  return images.map((src, idx) => {
    const image = new Image();

    listen(image, `load`, evt => {
      const img = evt.path[0];
      const imageProps = scale(img, context.canvas);
      state.images[idx] = imageProps;

      drawImg(context, { img, idx, ...imageProps });
    });

    image.src = src;

    return image;
  });
}
