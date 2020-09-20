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

export const swapItemsInList = <ItemType extends Item>(
  firstItem: ItemType,
  secondItem: ItemType,
  list: ItemType[]
): ItemType[] => {
  const firstItemIndex = list.findIndex(item => item.id === firstItem.id);
  const secondItemIndex = list.findIndex(item => item.id === secondItem.id);
  const itemsWithoutFirstItem = [
    ...list.slice(0, firstItemIndex),
    ...list.slice(firstItemIndex + 1)
  ];

  const newList = [
    ...itemsWithoutFirstItem.slice(0, secondItemIndex),
    firstItem,
    ...itemsWithoutFirstItem.slice(secondItemIndex)
  ];

  return newList;
};
