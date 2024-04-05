import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../../constants/colors';

/**
 * OutlinedButton - A customizable outlined button component.
 * 
 * @component
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @param {object} style - Additional styles to be applied to the container view.
 * @returns {JSX.Element} The rendered OutlinedButton component.
 * 
 * @example
 * const handlePress = () => {
 *     console.log('Button pressed!');
 * };
 * 
 * <OutlinedButton onPress={handlePress}>Click Me</OutlinedButton>
 */
function OutlinedButton({ onPress, children, style }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        width: '60%',
        padding: 12,
        margin: 8,
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.primary[800],
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.text,
    },
});