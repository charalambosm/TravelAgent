import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * IconButton - A reusable button component that displays an icon.
 * 
 * @component
 * @param {string} icon - The name of the icon to display. Refer to the Ionicons documentation for available icon names.
 * @param {number} size - The size of the icon.
 * @param {string} color - The color of the icon.
 * @param {function} onPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} The rendered IconButton component.
 * 
 * @example
 * const handlePress = () => {
 *   console.log('Button pressed!');
 * };
 * 
 * <IconButton icon="heart" size={24} color="red" onPress={handlePress} />
 */
function IconButton({ icon, size, color, style, onPress, props, disabled = false }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, style, disabled && styles.disabled, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons 
      name={icon}
      size={size}
      color={color}
      {...props} 
      />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
});