import React from 'react';
import renderer, { ReactTestInstance } from 'react-test-renderer';
import CreateWorkout, { Props } from './CreateWorkout';
import Input from '../components/Input/Input';

const render = (overrideProps: Partial<Props> = {}): ReactTestInstance => {
  const props = {
    workout: [],
    ...overrideProps
  };
  return renderer.create(<CreateWorkout {...props} />).root;
};

describe('Input', () => {
  it('renders items for passed workout', () => {
    const workout = ['testing', 'workout'];
    const element = render({ workout });
    element.findAllByType(Input).forEach((input, index) => {
      expect(input.findByType(Input).props.value).toEqual(workout[index]);
    });
  });
});
