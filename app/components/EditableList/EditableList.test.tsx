import React from 'react';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import { View, TouchableWithoutFeedback } from 'react-native';

import EditableList, { Props, ItemRendererProps } from './EditableList';

const ChildComponent = ({
  keyValue,
  value,
  isFocused
}: {
  keyValue: string;
  value: string;
  isFocused: boolean;
}): React.ReactElement => {
  return <View key={keyValue}>{isFocused && value}</View>;
};

const render = (override: Partial<Props>): ReactTestInstance => {
  const items = new Map();
  const props = {
    items,
    itemRenderer: (props: ItemRendererProps): React.ReactElement => (
      <ChildComponent
        keyValue={props.key}
        value={props.value}
        isFocused={props.isFocused}
      />
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

  describe('itemRenderer isFocused', () => {
    const items = new Map([
      ['key1', 'value1'],
      ['key2', 'value2']
    ]);
    const element = render({ items });
    const getFirstRenderedItem = (element): ReactTestInstance => {
      return element.findAllByType(TouchableWithoutFeedback)[0];
    };

    it('passes initially false', () => {
      expect(
        getFirstRenderedItem(element).findByType(ChildComponent).props.isFocused
      ).toBeFalsy();
    });

    it('passes true upon long press for the item', () => {
      act(() => getFirstRenderedItem(element).props.onLongPress());
      expect(
        getFirstRenderedItem(element).findByType(ChildComponent).props.isFocused
      ).toBeTruthy();
    });

    it('passes false upon pressing other item', () => {
      act(() =>
        element.findAllByType(TouchableWithoutFeedback)[1].props.onPress()
      );
      expect(
        getFirstRenderedItem(element).findByType(ChildComponent).props.isFocused
      ).toBeFalsy();
    });
  });
});
