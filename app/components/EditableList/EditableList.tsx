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

type LayoutPosition = {
  screenX: number;
  screenY: number;
  width: number;
  height: number;
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

  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 200
    });
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('Grant');
      },
      onPanResponderMove: (gestureState: GestureResponderEvent) => {
        const { locationX, locationY } = gestureState.nativeEvent;
        console.log('onPanResponderMove', locationX, locationY);
      },
      onPanResponderRelease: () => {
        console.log('Release');
      }
    })
  ).current;

  const updateItemPosition = (
    item: RenderItem,
    position: LayoutPosition
  ): void => {
    setRenderedItems(items =>
      updateItemInList({ ...item, ...position }, items)
    );
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
