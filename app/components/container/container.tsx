import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export default function Container({ children }: Props): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
