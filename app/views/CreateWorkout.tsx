import React from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from '../lib/uuid';
import Input from '../components/Input/Input';
import Container from '../components/container/container';
import Icon from '../components/Icon/Icon';
import EditableList from '../components/EditableList/EditableList';

export const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'stretch',
    flex: 1
  },
  item: {
    flexDirection: 'row'
  },
  input: {
    flexGrow: 2
  }
});

export type Props = {
  workout: string[];
  onSubmitWorkout?: (workout: string[]) => void;
};

export default function CreateWorkoutView({
  workout
}: Props): React.ReactElement {
  const [moves, setMoves] = React.useState(
    workout.map(move => {
      return { id: uuid(), name: move, isFocused: false };
    })
  );

  const onChangeMove = (id: string) => (newValue: string): void => {
    const index = moves.findIndex(move => move.id === id);
    setMoves([
      ...moves.slice(0, index),
      { id: id, name: newValue, isFocused: false },
      ...moves.slice(index + 1)
    ]);
  };

  const onAddMove = (): void => {
    setMoves([...moves, { id: uuid(), name: '', isFocused: false }]);
  };

  const onRemoveMove = (id: string): void => {
    const index = moves.findIndex(move => move.id === id);
    setMoves([...moves.slice(0, index), ...moves.slice(index + 1)]);
  };

  return (
    // <Container>
    <View style={styles.itemContainer}>
      <EditableList
        items={moves}
        itemRenderer={(item): React.ReactElement => (
          <>
            <Input
              isFocused={item.isFocused}
              value={item.name}
              onChangeValue={onChangeMove(item.id)}
              style={styles.input}
            />
            <Icon
              name="minus"
              onPress={(): void => {
                onRemoveMove(item.id);
              }}
            />
          </>
        )}
      />
      <Icon name="plus" onPress={onAddMove} />
    </View>
    // <Icon name="check" onPress={(): void => {}} />
    // </Container>
  );
}
