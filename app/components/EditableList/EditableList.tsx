import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback
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
  onRemoveItem: (key: string) => void;
};

const EditableList = ({
  items,
  itemRenderer,
  onRemoveItem
}: Props): React.ReactElement => {
  const [focusedItem, setFocusedItem] = React.useState(undefined);

  const onPressItem = (key: string): void => {
    if (key !== focusedItem) {
      setFocusedItem(undefined);
    }
  };

  return (
    <FlatList
      style={styles.listContainer}
      data={Array.from(items)}
      keyboardShouldPersistTaps={'always'}
      renderItem={({
        item
      }: {
        item: [string, string];
      }): React.ReactElement => {
        const [key, value] = item;
        const isFocused = focusedItem === key;
        return (
          <TouchableWithoutFeedback
            onLongPress={(): void => {
              setFocusedItem(key);
            }}
            onPress={(): void => onPressItem(key)}
          >
            <View key={key} style={styles.item}>
              {itemRenderer({ key, value, isFocused })}
              <Icon
                name="minus"
                onPress={(): void => {
                  onRemoveItem(key);
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      }}
      keyExtractor={(item): string => item[0]}
    />
  );
};

export default EditableList;
