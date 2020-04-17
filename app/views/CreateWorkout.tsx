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
    new Map(
      workout.map(move => {
        return [uuid(), move];
      })
    )
  );

  const onChangeMove = (id: string) => (newValue: string): void => {
    setMoves(new Map(moves.set(id, newValue)));
  };

  const onAddMove = (): void => {
    setMoves(new Map(moves.set(uuid(), '')));
  };

  const onRemoveMove = (id: string): void => {
    moves.delete(id);
    setMoves(new Map(moves));
  };

  return (
    <Container>
      <View style={styles.itemContainer}>
        <EditableList
          items={moves}
          itemRenderer={({ key, value, isFocused }): React.ReactElement => (
            <>
              <Input
                isFocused={isFocused}
                value={value}
                onChangeValue={onChangeMove(key)}
                style={styles.input}
              />
              <Icon
                name="minus"
                onPress={(): void => {
                  onRemoveMove(key);
                }}
              />
            </>
          )}
        />
        <Icon name="plus" onPress={onAddMove} />
      </View>
      <Icon name="check" onPress={(): void => {}} />
    </Container>
  );
}
