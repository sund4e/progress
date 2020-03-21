import React from 'react';
import renderer from 'react-test-renderer';
import { TextInput } from 'react-native';
import Input, { styles } from './textInput';

jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React = require.requireActual('react');
  const setNativePropsSpy = jest.fn();

  class TextInput extends React.Component {
    setNativeProps = setNativePropsSpy;
    render() {
      return <div />;
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

describe('Input', () => {
  it('updates native component style upon focus ', () => {
    const testRenderer = renderer.create(<Input />);
    const element = testRenderer.root;
    element.findByType(TextInput).props.onFocus();
    expect(
      element.findByType(TextInput).instance.setNativeProps
    ).toHaveBeenCalledWith({ style: styles.focused });
  });

  it('updates native component style upon blur ', () => {
    const testRenderer = renderer.create(<Input />);
    const element = testRenderer.root;
    element.findByType(TextInput).props.onBlur();
    expect(
      element.findByType(TextInput).instance.setNativeProps
    ).toHaveBeenCalledWith({ style: styles.unfocused });
  });
});
