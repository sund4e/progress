import { updateItemInList, moveItemInList } from './list';
import { RenderItem, LayoutPosition } from '../tests/mocks/factories';

describe('updateItemInList', () => {
  it('updates item if it exists in list', () => {
    const itemToUpdate = RenderItem.build();
    const list = [RenderItem.build(), itemToUpdate, RenderItem.build()];
    const updatedItem = {
      ...itemToUpdate,
      position: LayoutPosition.build({
        screenX: 200
      })
    };
    const updatedList = updateItemInList(updatedItem, list);
    expect(updatedList.length).toEqual(list.length);
    expect(updatedList[1].position.screenX).toEqual(200);
  });

  it('does not update list if item does not exits there', () => {
    const list = [RenderItem.build(), RenderItem.build(), RenderItem.build()];
    const updatedItem = RenderItem.build();
    const updatedList = updateItemInList(updatedItem, list);
    expect(updatedList).toEqual(list);
  });
});

describe('swapItemsInList', () => {
  it('updates item if it exists in list', () => {
    const firstItem = RenderItem.build();
    const secondItem = RenderItem.build();
    const thirdItem = RenderItem.build();
    const fourthItem = RenderItem.build();
    const list = [firstItem, secondItem, thirdItem, fourthItem];
    const updatedList = moveItemInList(secondItem, 3, list);
    expect(updatedList.length).toEqual(list.length);
    expect(updatedList[0]).toEqual(firstItem);
    expect(updatedList[1]).toEqual(thirdItem);
    expect(updatedList[2]).toEqual(fourthItem);
    expect(updatedList[3]).toEqual(secondItem);
  });
});
