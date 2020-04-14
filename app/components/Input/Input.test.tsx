import React from 'react';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import { TextInput } from 'react-native';
import Input, { styles, Props } from './Input';

jest.mock('react-native/Libraries/Components/TextInput/TextInput', () => {
  const RealComponent = require.requireActual(
    'react-native/Libraries/Components/TextInput/TextInput'
  );
  const React = require.requireActual('react');
  const setNativePropsSpy = jest.fn();
  const focusSpy = jest.fn();

  class TextInput extends React.Component {
    setNativeProps = setNativePropsSpy;
    focus = focusSpy;
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
    isFocused: false,
    ...overrideProps
  };

  let element;
  act(() => {
    element = renderer.create(<Input {...props} />);
  });

  return element.root;
};

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isFocused', () => {
    it('with false does not render TextInput', () => {
      const element = render({ isFocused: false });
      expect(() => element.findByType(TextInput)).toThrow();
    });

    it('with true renders and focuses TextInput', () => {
      const element = render({ isFocused: true });
      const textInput = element.findByType(TextInput);
      expect(textInput).toBeDefined();
      expect(textInput.instance.focus).toHaveBeenCalled();
    });

    it('with true sets native component style', () => {
      const element = render({ isFocused: true });
      expect(
        element.findByType(TextInput).instance.setNativeProps
      ).toHaveBeenCalledWith({ style: styles.focused });
    });
  });

  describe('value', () => {
    it('renders passed value', () => {
      const value = 'Testing value';
      const element = render({ value });
      expect(element.find(child => child.children[0] === value)).toBeDefined();
    });

    it('renders placeholder if no value', () => {
      const value = '';
      const element = render({ value });
      expect(
        element.find(child => child.children[0] === 'Name your move')
      ).toBeDefined();
    });
  });

  it('calls onChangeValue upon value change', () => {
    const newValue = 'New value';
    const onChangeValue = jest.fn();
    const element = render({ onChangeValue, isFocused: true });
    element.findByType(TextInput).props.onChangeText(newValue);
    expect(onChangeValue).toHaveBeenCalledWith(newValue);
  });
});
