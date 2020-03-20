import React from 'react';
import renderer from 'react-test-renderer';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import Container from './container';

describe('Container', () => {
  it('dismisses keyboard upon focus', () => {
    const dismiss = jest.fn();
    Keyboard.dismiss = dismiss;
    const element = renderer.create(
      <Container>
        <div />
      </Container>
    ).root;
    element.findByType(TouchableWithoutFeedback).props.onPress();
    expect(dismiss).toHaveBeenCalled();
  });
});
