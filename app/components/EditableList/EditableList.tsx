import React from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  PanResponder,
  Animated,
  GestureResponderEvent
} from 'react-native';
import { Item, updateItemInList, moveItemInList } from '../../helpers/list';
import { LayoutPosition, isOverPosition } from './helpers';

const ANIMATION_DURATION = 200;

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row'
  },
  listContainer: {
    flexGrow: 1
  }
});

export type RenderItem<ItemType extends Item> = ItemType & {
  position?: LayoutPosition;
};

export type Props<ItemType extends Item> = {
  items: ItemType[];
  setItems: (items: ItemType[]) => void;
  itemRenderer: (item: ItemType) => React.ReactElement;
};

export type EditableListItemProps = {
  itemRenderer: () => React.ReactElement;
  onRender: (postion: LayoutPosition) => void;
};

const EditableListItem = ({
  itemRenderer,
  onRender
}: EditableListItemProps): React.ReactElement => {
  const onLayout = (event): void => {
    const { width, height, y, x } = event.nativeEvent.layout;
    onRender({ width, height, screenX: x, screenY: y });
  };

  return (
    //disable pointerEvents so that the parent (list) captures all the touches and the location in panresponder refers to the list not the list
    <View onLayout={onLayout} pointerEvents="none">
      <View style={styles.item}>{itemRenderer()}</View>
    </View>
  );
};

const EditableList = <ItemType extends Item>({
  items,
  setItems,
  itemRenderer
}: Props<ItemType>): React.ReactElement => {
  const [renderedItems, setRenderedItems] = React.useState<
    RenderItem<ItemType>[]
  >(items);
  const draggingEnabled = React.useRef(true);
  const draggedItem = React.useRef<RenderItem<ItemType>>(null);

  React.useEffect(() => {
    setRenderedItems(items);
  }, [items]);

  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: ANIMATION_DURATION
    });
  });

  const getItemAtCooridate = (x: number, y: number): ItemType => {
    return (
      renderedItems &&
      renderedItems.find(
        item => item.position && isOverPosition(x, y, item.position)
      )
    );
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (gestureState: GestureResponderEvent) => {
          const {
            locationX,
            locationY,
            changedTouches
          } = gestureState.nativeEvent;

          //Avoid catching event if multitouch gesture (e.g. tap)
          if (changedTouches.length !== 1) {
            return false;
          }

          const itemTouched = getItemAtCooridate(locationX, locationY);
          if (!itemTouched) {
            return false;
          }
          draggedItem.current = itemTouched;
          return true;
        },
        onPanResponderMove: (gestureState: GestureResponderEvent) => {
          const { locationX, locationY } = gestureState.nativeEvent;

          if (!draggingEnabled.current) {
            return;
          }

          const itemAtCooridnates = getItemAtCooridate(locationX, locationY);
          if (
            itemAtCooridnates &&
            itemAtCooridnates.id !== draggedItem.current.id
          ) {
            const newItems = moveItemInList(
              draggedItem.current,
              renderedItems.findIndex(item => item.id === itemAtCooridnates.id),
              renderedItems
            );

            setItems(newItems);

            //Disable dragging for the time of the animation
            draggingEnabled.current = false;
            setTimeout(() => {
              draggingEnabled.current = true;
            }, ANIMATION_DURATION);
          }
        },
        onPanResponderEnd: () => {
          draggedItem.current = null;
        }
      }),
    [renderedItems]
  );

  const updateItemPosition = (
    item: RenderItem<ItemType>,
    position: LayoutPosition
  ): void => {
    setRenderedItems(items => updateItemInList({ ...item, position }, items));
  };

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
