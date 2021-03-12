import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';

const Input = props => {
  const {
    value,
    onChangeText,
    onSubmitEditing,
    inputStyle,
    inputContainerStyle,
    textInputProps
  } = props;

  return (
    <View style={[styles.textInputContainer, inputContainerStyle]}>
      <TextInput
        {...textInputProps}
        style={[styles.textInput, inputStyle]}
        value={value}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  inputStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  textInputProps: PropTypes.object
};

export { Input };
export default Input;
