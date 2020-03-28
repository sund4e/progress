import React from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from '../lib/uuid';
import Input from '../components/Input/Input';
import Container from '../components/container/container';
import Icon from '../components/Icon/Icon';

export const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'stretch'
  }
});

export type Props = {
  workout: string[];
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

  return (
    <Container>
      <View style={styles.itemContainer}>
        {Array.from(moves).map(([key, move]) => {
          return (
            <Input key={key} value={move} onChangeValue={onChangeMove(key)} />
          );
        })}
      </View>
      <Icon name="plus" />
    </Container>
  );
}
