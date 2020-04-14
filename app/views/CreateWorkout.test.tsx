import React from 'react';
import renderer, { ReactTestInstance, act } from 'react-test-renderer';
import CreateWorkout, { Props } from './CreateWorkout';
import Input from '../components/Input/Input';
jest.mock(
  'react-native/Libraries/Components/TextInput/TextInput',
  () => 'TextInput'
);

const render = (overrideProps: Partial<Props> = {}): ReactTestInstance => {
  const props = {
    workout: [],
    onSubmitWorkout: (): void => {},
    ...overrideProps
  };
  return renderer.create(<CreateWorkout {...props} />).root;
};

describe('CreateWorkoutView', () => {
  const workout = ['testing', 'workout'];

  it('renders items for passed workout', () => {
    const element = render({ workout });
    element.findAllByType(Input).forEach((input, index) => {
      expect(input.findByType(Input).props.value).toEqual(workout[index]);
    });
  });

  it('creates new move when clicking plus icon', () => {
    const element = render({ workout });
    act(() => {
      element.findByProps({ name: 'plus' }).props.onPress();
    });
    expect(element.findAllByType(Input).length).toEqual(workout.length + 1);
  });

  it('removes move when clicking minus icon', () => {
    const moveToRemove = workout[0];
    const element = render({ workout });
    act(() => {
      const listItem = element.findByProps({ value: moveToRemove }).parent;
      listItem.findByProps({ name: 'minus' }).props.onPress();
    });
    expect(element.findAllByType(Input).length).toEqual(workout.length - 1);
  });
});
