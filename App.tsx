import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './src/graphql/mutations';
import { CreateTodoInput } from './src/API';
import { listTodos } from './src/graphql/queries';

import config from './aws-exports';
API.configure(config); // Configure Amplify
PubSub.configure(config);

const reducer = (state, action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, todos: action.todos };
    case 'SUBSCRIPTION':
      return { ...state, todos: [...state.todos, action.todo] };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  useEffect(() => {
    getData();
  }, []);

  const click = async () => {
    const todo: CreateTodoInput = {
      name: 'testing',
      description: 'just testing'
    };
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
    await getData();
  };

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos));
    dispatch({ type: 'QUERY', todos: todoData.data.listTodos.items });
  }
  console.log('hello');

  return (
    <View style={styles.container}>
      <Text>Testing what happens :D</Text>
      <Button onPress={click} title={'Press me'} />
      {state.todos.map((todo, i) => (
        <Text key={todo.id}>
          {todo.name} : {todo.description}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
