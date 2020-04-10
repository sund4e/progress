import React from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
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
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    fontSize: 18
  }
});

export type Props = {
  value: string;
  onChangeValue: (newValue: string) => void;
  focusOnMount?: boolean;
  style?: object;
};

export default function Input({
  value,
  onChangeValue,
  focusOnMount,
  style
}: Props): React.ReactElement {
  const [isAcive, setIsActive] = React.useState(focusOnMount);
  const inputRef = React.useRef<TextInput>();

  const onBlur = (): void => {
    setIsActive(false);
  };

  const onFocus = (): void => {
    setIsActive(true);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setNativeProps({
        style: styles.focused
      });
    }
  };

  const unfocusedStyle = { ...styles.input, ...styles.unfocused, ...style };
  const emptyStyle = { ...styles.input, ...styles.empty, ...style };
  const isEmpty = value === '';

  return !isAcive ? (
    <TouchableWithoutFeedback onLongPress={onFocus}>
      <Text style={isEmpty ? emptyStyle : unfocusedStyle}>
        {isEmpty ? 'Name your move' : value}
      </Text>
    </TouchableWithoutFeedback>
  ) : (
    <TextInput
      ref={inputRef}
      style={unfocusedStyle}
      onChangeText={(text): void => onChangeValue(text)}
      placeholderTextColor={colors.light}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
