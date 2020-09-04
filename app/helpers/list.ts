export type Item = {
  id: string;
};
export const updateItemInList = (newItem: Item, list: Item[]): Item[] => {
  const index = list.findIndex(item => item.id === newItem.id);
  if (index === undefined) {
    return list;
  }
  return [...list.slice(0, index), newItem, ...list.slice(index + 1)];
};
