import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors';
import CustomText from './CustomText';
import { Ionicons } from '@expo/vector-icons';

/**
 * CustomCheckbox - A customizable checkbox component.
 * 
 * @component
 * @param {function} onPress - The function to be called when the checkbox is pressed.
 * @param {boolean} isChecked - Specifies whether the checkbox is checked.
 * @param {ReactNode} children - The content to be displayed alongside the checkbox.
 * @returns {JSX.Element} The rendered CustomCheckbox component.
 * 
 * @example
 * const handleCheckboxPress = () => {
 *   // Handle checkbox press
 * };
 * 
 * <CustomCheckbox onPress={handleCheckboxPress} isChecked={true}>
 *   This is a checked checkbox
 * </CustomCheckbox>
 */
const CustomCheckbox = ({ onPress, isChecked, children }) => {

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}>
      <View
        style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}>
        {isChecked && <Ionicons name="checkmark" size={24} color="white" />}
      </View>
      <CustomText>{children}</CustomText>
    </Pressable>
  )
}

export default CustomCheckbox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginVertical: 4,
  },
  pressed: {
    backgroundColor: 'gray',
    opacity: 0.8,
  },
  checkboxBase: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.placeholder,
    backgroundColor: Colors.background,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary[500],
    borderColor: 'transparent',
  },

})