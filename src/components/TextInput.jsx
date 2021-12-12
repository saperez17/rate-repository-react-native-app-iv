import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
      style,
      error && styles.errorStatus,
    ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

const styles = StyleSheet.create({
    errorStatus: {
        borderWidth: 1,
        borderColor: '#d73a4a',
    }
});

export default TextInput;