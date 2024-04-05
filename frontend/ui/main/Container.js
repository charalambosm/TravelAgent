import React from 'react';
import { Platform, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

/**
 * Container - A flexible container component with keyboard avoiding behavior.
 * 
 * @component
 * @param {ReactNode} children - The content to be displayed inside the container.
 * @param {object} style - Additional styles to be applied to the container view.
 * @param {boolean} useKeyboardAvoidingView - Flag to enable or disable the keyboardAvoidingView.
 * @returns {JSX.Element} The rendered Container component.
 * 
 * @example
 * <Container style={{ backgroundColor: 'white' }}>
 *     {Content goes here} 
 * </Container>
 */
const Container = ({ children, style, useKeyboardAvoidingView = true }) => {
    if (useKeyboardAvoidingView) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, style]}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
    return <View style={[{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, style]}>
        {children}
    </View>
};

export default Container;