import React from 'react';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import { TextInput } from 'react-native';
import Input, { styles, Props } from './Input';

jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
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
    ...overrideProps
  };
  return renderer.create(<Input {...props} />).root;
};

describe('Input', () => {
  describe('styles', () => {
    it('updates native component style upon focus ', () => {
      const element = render({ focusOnMount: true });
      element.findByType(TextInput).props.onFocus();
      expect(
        element.findByType(TextInput).instance.setNativeProps
      ).toHaveBeenCalledWith({ style: styles.focused });
    });
  });

  describe('focusOnMount', () => {
    it('with undefined does not render TextInput', () => {
      const element = render({ focusOnMount: undefined });
      expect(() => element.findByType(TextInput)).toThrow();
    });

    it('with true renderd TextInput', () => {
      const element = render({ focusOnMount: true });
      expect(element.findByType(TextInput)).toBeDefined();
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

  it('renders TextInput upon long press', () => {
    const element = render();
    act(() => {
      (element.children[0] as ReactTestInstance).props.onLongPress();
    });
    expect(element.findByType(TextInput)).toBeDefined();
  });

  it('does not render text input when blurred', () => {
    const element = render({ value: 'something', focusOnMount: true });
    act(() => {
      element.findByType(TextInput).props.onBlur();
    });
    expect(() => element.findByType(TextInput)).toThrow();
  });

  it('calls onChangeValue upon value change', () => {
    const newValue = 'New value';
    const onChangeValue = jest.fn();
    const element = render({ onChangeValue });
    act(() => {
      (element.children[0] as ReactTestInstance).props.onLongPress();
    });
    element.findByType(TextInput).props.onChangeText(newValue);
    expect(onChangeValue).toHaveBeenCalledWith(newValue);
  });
});
