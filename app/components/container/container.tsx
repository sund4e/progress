import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function Container({ children }: Props): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
