import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const styles = StyleSheet.create({
  empty: {
    borderColor: colors.light,
    color: colors.light,
    backgroundColor: 'transparent'
  },
  focused: {
    borderColor: colors.accent,
    color: colors.accent,
    backgroundColor: colors.primary
  },
  unfocused: {
    borderColor: colors.highlight,
    color: colors.highlight,
    backgroundColor: colors.primary
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    fontSize: 18
  }
});

export type Props = {
  value: string;
  onChangeValue: (newValue: string) => void;
  style?: object;
};

export default function Input({
  value,
  onChangeValue,
  style
}: Props): React.ReactElement {
  const inputRef = React.useRef<TextInput>();

  const onBlur = (): void => {
    const isEmpty = value === '';
    if (inputRef.current) {
      inputRef.current.setNativeProps({
        style: isEmpty ? styles.empty : styles.unfocused
      });
    }
  };

  const onFocus = (): void => {
    if (inputRef.current) {
      inputRef.current.setNativeProps({
        style: styles.focused
      });
    }
  };

  return (
    <TextInput
      ref={inputRef}
      style={{ ...styles.input, ...styles.unfocused, ...style }}
      onChangeText={(text): void => onChangeValue(text)}
      placeholder={'Name your move'}
      placeholderTextColor={colors.light}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
