import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

/**
 * TextInput - A customizable text input component.
 * 
 * @component
 * @param {object} props - Additional props to be passed to the TextInput component.
 * @returns {JSX.Element} The rendered TextInput component.
 * 
 * @example
 * <CustomTextInput
 *   placeholder="Enter your email"
 *   onChangeText={(text) => console.log(text)}
 *   keyboardType="email-address"
 *   secureTextEntry
 * />
 */
const CustomTextInput = ({ style, ...props }) => {
  const [hasValue, setHasValue] = useState(false);

  const handleTextChange = (text) => {
    setHasValue(text.length > 0);
    props.onChangeText(text);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        {(hasValue || props.showLabel) && <Text>{(props.label ? props.label : props.placeholder)}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[{
            height: 36
          }]}
          {...props}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 12,
  },
  labelContainer: {
    backgroundColor: Colors.background,
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    marginStart: 12,
    zIndex: 1,
    elevation: 1,
    shadowColor: Colors.background, // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -8,
  },
  inputContainer: {
    borderColor: Colors.text,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    zIndex: 0,
  },

})

export default CustomTextInput;