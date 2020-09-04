export type Item = {
  id: string;
  [key: string]: unknown;
};
export const updateItemInList = <ItemType extends Item>(
  newItem: ItemType,
  list: ItemType[]
): ItemType[] => {
  const index = list.findIndex(item => item.id === newItem.id);
  if (index === undefined) {
    return list;
  }
  return [...list.slice(0, index), newItem, ...list.slice(index + 1)];
};
