import React from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  PanResponder,
  Animated,
  GestureResponderEvent
} from 'react-native';
import { Item, updateItemInList } from '../../helpers/list';
import { LayoutPosition, isOverPosition } from './helpers';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row'
  },
  listContainer: {
    flexGrow: 1
  }
});

export type Props<ItemType extends Item> = {
  items: ItemType[];
  itemRenderer: (item: ItemType) => React.ReactElement;
};

export type EditableListItemProps = {
  itemRenderer: () => React.ReactElement;
  onRender: (LayoutPosition) => void;
};

const EditableListItem = ({
  itemRenderer,
  onRender
}: EditableListItemProps): React.ReactElement => {
  const viewRef = React.useRef<View>();

  const onLayout = (): void => {
    console.log('onLayout');
    viewRef.current &&
      viewRef.current.measure((x, y, width, height, screenX, screenY) => {
        onRender({ width, height, screenX, screenY });
      });
  };

  return (
    <View ref={viewRef} onLayout={onLayout}>
      <View style={styles.item}>{itemRenderer()}</View>
    </View>
  );
};

const EditableList = <ItemType extends Item>({
  items,
  itemRenderer
}: Props<ItemType>): React.ReactElement => {
  type RenderItem = ItemType & { position?: LayoutPosition };
  const [renderedItems, setRenderedItems] = React.useState<RenderItem[]>(items);
  const draggedItem = React.useRef<RenderItem>(null);

  React.useEffect(() => {
    setRenderedItems(items);
  }, [items]);

  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 200
    });
  });

        draggingEnabled.current = true;
      }, ANIMATION_DURATION);
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (gestureState: GestureResponderEvent) => {
          const { pageX, pageY, changedTouches } = gestureState.nativeEvent;

          //Avoid catching event if multitouch gesture (e.g. tap)
          if (changedTouches.length !== 1) {
            return false;
          }

          const itemTouched = getItemAtCooridate(pageX, pageY);
          if (!itemTouched) {
            return false;
          }

          draggedItem.current = itemTouched;
          return true;
        },
        onPanResponderGrant: () => {
          console.log('Grant');
        },
        onPanResponderMove: (gestureState: GestureResponderEvent) => {
          const { pageX, pageY } = gestureState.nativeEvent;

          const itemAtCooridnates = getItemAtCooridate(pageX, pageY);
          if (itemAtCooridnates) {
            console.log('onPanResponderMove', draggedItem);
            const draggedItemIndex = renderedItems.findIndex(
              item => item.id === draggedItem.current.id
            );
            const touchedItemIndex = renderedItems.findIndex(
              item => item.id === itemAtCooridnates.id
            );
            const itemsWithoutDraggedItem = [
              ...renderedItems.slice(0, draggedItemIndex),
              ...renderedItems.slice(draggedItemIndex + 1)
            ];

            console.log('setRenderedItems', [
              ...itemsWithoutDraggedItem.slice(0, touchedItemIndex),
              draggedItem.current,
              ...itemsWithoutDraggedItem.slice(touchedItemIndex + 1)
            ]);
            setRenderedItems([
              ...itemsWithoutDraggedItem.slice(0, touchedItemIndex),
              draggedItem.current,
              ...itemsWithoutDraggedItem.slice(touchedItemIndex + 1)
            ]);
          }
        },
        onPanResponderEnd: () => {
          console.log('End');
        }
      }),
    [renderedItems]
  );

  const getItemAtCooridate = (x: number, y: number) => {
    return (
      renderedItems &&
      renderedItems.find(
        item => item.position && isOverPosition(x, y, item.position)
      )
    );
  };

  const updateItemPosition = (
    item: RenderItem,
    position: LayoutPosition
  ): void => {
    setRenderedItems(items => updateItemInList({ ...item, position }, items));
  };

  console.log('render');
  return (
    <Animated.ScrollView
      style={styles.listContainer}
      keyboardShouldPersistTaps={'always'}
      {...panResponder.panHandlers}
    >
      {renderedItems.map(item => (
        <EditableListItem
          key={item.id}
          itemRenderer={(): React.ReactElement => {
            return itemRenderer(item);
          }}
          onRender={(position: LayoutPosition): void =>
            updateItemPosition(item, position)
          }
        ></EditableListItem>
      ))}
    </Animated.ScrollView>
  );
};

export default EditableList;
