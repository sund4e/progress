import React from 'react';
import renderer, { ReactTestInstance } from 'react-test-renderer';
import { View } from 'react-native';
import { RenderItem } from '../../tests/mocks/factories';
import { Item } from '../../helpers/list';

import EditableList, { Props } from './EditableList';

const ChildComponent = ({
  keyValue
}: {
  keyValue: string;
}): React.ReactElement => {
  return <View key={keyValue}>id</View>;
};

const render = (override: Partial<Props<Item>>): ReactTestInstance => {
  const items = [];
  const props = {
    items,
    itemRenderer: (item: Item): React.ReactElement => (
      <ChildComponent keyValue={item.id} />
    ),
    onRemoveItem: (): void => {},
    ...override
  };
  return renderer.create(<EditableList {...props} />).root;
};

describe('EditableList', () => {
  fit('renders items with item renderer', () => {
    const items = [RenderItem.build(), RenderItem.build()];
    const element = render({ items });
    element.findAllByType(ChildComponent).forEach(child => {
      const value = items.find(item => item.id === child.props.keyValue);
      expect(child.props.keyValue).toEqual(value.id);
    });
  });
});
