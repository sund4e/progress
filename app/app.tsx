import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from '../src/graphql/mutations';
import { CreateTodoInput } from '../src/API';
import { listTodos } from '../src/graphql/queries';
import CreateWorkoutView from './views/CreateWorkout';
import { colors } from './styles';

import config from '../aws-exports';
API.configure(config); // Configure Amplify
PubSub.configure(config);

const reducer = (state, action): { todos: CreateTodoInput[] } => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, todos: action.todos };
    case 'SUBSCRIPTION':
      return { ...state, todos: [...state.todos, action.todo] };
    default:
      return state;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 20,
    justifyContent: 'center',
    fontSize: 20
  }
});

export default function App(): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  async function getData(): Promise<void> {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    dispatch({ type: 'QUERY', todos: todoData.data.listTodos.items });
  }

  useEffect(() => {
    getData();
  }, []);

  const click = async (): Promise<void> => {
    const todo: CreateTodoInput = {
      name: 'testing',
      description: 'just testing'
    };
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
    await getData();
  };

  console.log('hello');

  return (
    <View style={styles.container}>
      <Text>Testing what happens :D</Text>
      <CreateWorkoutView workout={['testing', 'moves', 'jee']} />
      <Button onPress={click} title={'Press me'} />
      {state.todos.map(todo => (
        <Text key={todo.id}>
          {todo.name} : {todo.description}
        </Text>
      ))}
    </View>
  );
}
