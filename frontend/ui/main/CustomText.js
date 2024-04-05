import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

/**
 * TextHeading - A component for displaying heading text.
 * 
 * @component
 * @param {ReactNode} children - The content to be displayed as the heading text.
 * @returns {JSX.Element} The rendered TextHeading component.
 * 
 * @example
 * <CustomText>This is a Heading</CustomText>
 */
const CustomText = ({ children, style, ...props }) => {
    return (
        <Text
            style={[styles.text, style]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        margin: 10,
        fontSize: 16,
        color: Colors.text
    }
})

export default CustomText;