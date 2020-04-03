import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

export type Props = {
  name: string;
  onPress: () => void;
};

export const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export const colorUnPressed = colors.highlight;
export const colorPressed = colors.accent;

const Icon = ({ name, onPress }: Props): React.ReactElement => {
  const [color, setColor] = React.useState(colorUnPressed);
  const onPressIn = (): void => {
    setColor(colorPressed);
  };

  const onPressOut = (): void => {
    setColor(colorUnPressed);
  };

  return (
    <TouchableHighlight
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.container}
      onPress={onPress}
    >
      <SimpleLineIcons name={name} size={32} color={color} />
    </TouchableHighlight>
  );
};

export default Icon;
