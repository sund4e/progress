import React from 'react';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import { TouchableHighlight } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import Icon, { colorUnPressed, colorPressed, Props } from './Icon';

const render = (overrideProps: Partial<Props> = {}): ReactTestInstance => {
  const props = {
    name: 'plus',
    ...overrideProps
  };
  return renderer.create(<Icon {...props} />).root;
};

describe('Container', () => {
  it('passes in icon name', () => {
    const name = 'minus';
    const element = render({ name });
    expect(element.findByType(SimpleLineIcons).props.name).toEqual(name);
  });

  it('sets icon color on press', () => {
    const element = render();
    act(() => {
      element.findByType(TouchableHighlight).props.onPressIn();
    });
    expect(element.findByType(SimpleLineIcons).props.color).toEqual(
      colorPressed
    );
  });

  it('sets icon color on release', () => {
    const element = render();
    act(() => {
      element.findByType(TouchableHighlight).props.onPressIn();
      element.findByType(TouchableHighlight).props.onPressOut();
    });
    expect(element.findByType(SimpleLineIcons).props.color).toEqual(
      colorUnPressed
    );
  });
});
