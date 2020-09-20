import { Factory } from 'rosie';

export const LayoutPosition = Factory.define('position').attrs({
  screenX: 2,
  screenY: 3,
  width: 1,
  height: 2
});
export const RenderItem = Factory.define('renderItem')
  .sequence('id')
  .attrs({
    position: LayoutPosition.build()
  });
