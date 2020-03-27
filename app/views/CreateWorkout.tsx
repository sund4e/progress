import React from 'react';
import uuid from '../lib/uuid';
import Input from '../components/Input/Input';
import Container from '../components/container/container';

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
      {Array.from(moves).map(([key, move]) => {
        return (
          <Input key={key} value={move} onChangeValue={onChangeMove(key)} />
        );
      })}
    </Container>
  );
}
