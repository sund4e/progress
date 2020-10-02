export type Item = {
  id: string;
  [key: string]: unknown;
};
export const updateItemInList = <ItemType extends Item>(
  newItem: ItemType,
  list: ItemType[]
): ItemType[] => {
  const index = list.findIndex(item => item.id === newItem.id);
  if (index === -1) {
    return list;
  }
  return [...list.slice(0, index), newItem, ...list.slice(index + 1)];
};

export const moveItemInList = <ItemType extends Item>(
  itemToMove: ItemType,
  toIndex: number,
  list: ItemType[]
): ItemType[] => {
  const itemIndex = list.findIndex(item => item.id === itemToMove.id);
  const itemsWithoutItem = [
    ...list.slice(0, itemIndex),
    ...list.slice(itemIndex + 1)
  ];

  const newList = [
    ...itemsWithoutItem.slice(0, toIndex),
    itemToMove,
    ...itemsWithoutItem.slice(toIndex)
  ];

  return newList;
};
