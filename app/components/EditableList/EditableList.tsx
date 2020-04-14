import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Icon from '../Icon/Icon';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row'
  },
  input: {
    flexGrow: 2
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
  onPress: () => void;
  onLongPress: () => void;
};

const EditableListItem = ({
  itemRenderer,
  onPress,
  onLongPress
}: EditableListItemProps): React.ReactElement => (
  <TouchableWithoutFeedback
    onLongPress={onLongPress}
    onPress={onPress}
    delayPressIn={50}
  >
    <View style={styles.item}>{itemRenderer()}</View>
  </TouchableWithoutFeedback>
);

const EditableList = ({ items, itemRenderer }: Props): React.ReactElement => {
  const [focusedItemKey, setFocusedItemKey] = React.useState(undefined);

  const onPressItem = (key: string): void => {
    if (key !== focusedItemKey) {
      setFocusedItemKey(undefined);
    }
  };

  const selectItemKey = (key: string): void => {
    setFocusedItemKey(key);
  };

  return (
    <ScrollView
      style={styles.listContainer}
      keyboardShouldPersistTaps={'always'}
    >
      {Array.from(items).map(([key, value]) => (
        <EditableListItem
          key={key}
          itemRenderer={(): React.ReactElement =>
            itemRenderer({ key, value, isFocused: key === focusedItemKey })
          }
          onLongPress={(): void => selectItemKey(key)}
          onPress={(): void => onPressItem(key)}
        />
      ))}
    </ScrollView>
  );
};

export default EditableList;
