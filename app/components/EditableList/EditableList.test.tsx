import React from 'react';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import { View } from 'react-native';

import EditableList, { Props } from './EditableList';

const ChildComponent = ({
  keyValue,
  value
}: {
  keyValue: string;
  value: string;
}): React.ReactElement => {
  return <View key={keyValue}>{value}</View>;
};

const render = (override: Partial<Props>): ReactTestInstance => {
  const items = new Map();
  const props = {
    items,
    itemRenderer: (key, value): React.ReactElement => (
      <ChildComponent keyValue={key} value={value} />
    ),
    onRemoveItem: (): void => {},
    ...override
  };
  return renderer.create(<EditableList {...props} />).root;
};

describe('EditableList', () => {
  it('renders items with item renderer', () => {
    const items = new Map([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);
    const element = render({ items });
    element.findAllByType(ChildComponent).forEach(child => {
      const value = items.get(child.props.keyValue);
      expect(child.props.value).toEqual(value);
    });
  });

  it('calls onItemRemoved when remove button clicked', () => {
    const itemKey = 'key';
    const items = new Map([[itemKey, 'value']]);
    const onRemoveItem = jest.fn();
    const element = render({ items, onRemoveItem });
    act(() => {
      element.findByProps({ name: 'minus' }).props.onPress();
    });
    expect(onRemoveItem).toHaveBeenCalledWith(itemKey);
  });
});
