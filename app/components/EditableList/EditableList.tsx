import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  PanResponder,
  Animated
} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row'
  },
  listContainer: {
    flexGrow: 1
  }
});

export type ItemRendererProps = {
  key: string;
  value: string;
  isFocused: boolean;
};

export type Props = {
  items: Map<string, string>;
  itemRenderer: (props: ItemRendererProps) => React.ReactElement;
};

export type EditableListItemProps = {
  itemRenderer: () => React.ReactElement;
};

const EditableListItem = ({
  itemRenderer
}: EditableListItemProps): React.ReactElement => {
  const position = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value
        });
      },
      onPanResponderMove: Animated.event([null, { dy: position.y }]),
      onPanResponderRelease: () => {
        position.flattenOffset();
      }
    })
  ).current;

  return (
    <Animated.View
      style={{
        ...position.getLayout()
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.item}>{itemRenderer()}</View>
    </Animated.View>
  );
};

const EditableList = ({ items, itemRenderer }: Props): React.ReactElement => {
  return (
    <ScrollView
      style={styles.listContainer}
      keyboardShouldPersistTaps={'always'}
    >
      {Array.from(items).map(([key, value]) => (
        <EditableListItem
          key={key}
          itemRenderer={(): React.ReactElement =>
            itemRenderer({ key, value, isFocused: false })
          }
        ></EditableListItem>
      ))}
    </ScrollView>
  );
};

export default EditableList;
