import React from 'react';
import renderer, { ReactTestInstance } from 'react-test-renderer';
import { TextInput } from 'react-native';
import Input, { styles, Props } from './Input';

jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React = require.requireActual('react');
  const setNativePropsSpy = jest.fn();

  class TextInput extends React.Component {
    setNativeProps = setNativePropsSpy;
    render(): React.ReactElement {
      return <div />;
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

const render = (overrideProps: Partial<Props> = {}): ReactTestInstance => {
  const props = {
    value: 'Jee',
    onChangeValue: (): void => {},
    ...overrideProps
  };
  return renderer.create(<Input {...props} />).root;
};

describe('Input', () => {
  describe('styles', () => {
    it('updates native component style upon focus ', () => {
      const element = render();
      element.findByType(TextInput).props.onFocus();
      expect(
        element.findByType(TextInput).instance.setNativeProps
      ).toHaveBeenCalledWith({ style: styles.focused });
    });

    it('updates native component style upon blur ', () => {
      const element = render();
      element.findByType(TextInput).props.onBlur();
      expect(
        element.findByType(TextInput).instance.setNativeProps
      ).toHaveBeenCalledWith({ style: styles.unfocused });
    });
  });

  it('renders passed value', () => {
    const value = 'Testing value';
    const element = render({ value });
    expect(element.findByType(TextInput).props.value).toEqual(value);
  });

  it('calls onChangeValue upon value change', () => {
    const newValue = 'New value';
    const onChangeValue = jest.fn();
    const element = render({ onChangeValue });
    element.findByType(TextInput).props.onChangeText(newValue);
    expect(onChangeValue).toHaveBeenCalledWith(newValue);
  });
});
