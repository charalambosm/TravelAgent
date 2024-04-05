import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

/**
 * Button - A customizable button component.
 * 
 * @component
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @param {object} style - The custom style to be applied to the button
 * @returns {JSX.Element} The rendered Button component.
 * 
 * @example
 * const handlePress = () => {
 *     console.log('Button pressed!');
 * };
 * 
 * <Button onPress={handlePress}>Click Me</Button>
 */
function Button({ onPress, children, style, disabled = false }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, style, pressed && styles.pressed, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        width: '60%',
        padding: 12,
        margin: 8,
        backgroundColor: Colors.primary[800],
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.7,
    },
    disabled: {
        opacity: 0.7,
        backgroundColor: Colors.placeholder,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.background,
    },
});