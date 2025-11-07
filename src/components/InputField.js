import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  style,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default InputField;
