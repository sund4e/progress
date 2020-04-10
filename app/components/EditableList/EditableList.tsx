import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
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

export type Props = {
  items: Map<string, string>;
  itemRenderer: (key: string, value: string) => React.ReactElement;
  onRemoveItem: (key: string) => void;
};

const EditableList = ({
  items,
  itemRenderer,
  onRemoveItem
}: Props): React.ReactElement => (
  <FlatList
    style={styles.listContainer}
    data={Array.from(items)}
    renderItem={({ item }: { item: [string, string] }): React.ReactElement => {
      const [key, value] = item;
      return (
        <View key={key} style={styles.item}>
          {itemRenderer(key, value)}
          <Icon
            name="minus"
            onPress={(): void => {
              onRemoveItem(key);
            }}
          />
        </View>
      );
    }}
    keyExtractor={(item): string => item[0]}
  />
);

export default EditableList;
