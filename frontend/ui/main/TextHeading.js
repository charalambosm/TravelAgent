import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../constants/colors';

/**
 * TextHeading - A component for displaying heading text.
 * 
 * @component
 * @param {ReactNode} children - The content to be displayed as the heading text.
 * @returns {JSX.Element} The rendered TextHeading component.
 * 
 * @example
 * <TextHeading>This is a Heading</TextHeading>
 */
const TextHeading = ({ children, style, ...props }) => {
    return (
        <Text
            style={[{
                fontSize: 16,
                fontWeight: 'bold',
                margin: 10,
                color: Colors.text
            }, style]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default TextHeading;