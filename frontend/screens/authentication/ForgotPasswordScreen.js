import React, { useState } from 'react';
import { Alert } from 'react-native';
import { forgotPassword } from '../../util/auth';
import CustomTextInput from '../../ui/main/CustomTextInput';
import Button from '../../ui/main/Button';
import Container from '../../ui/main/Container';
import TextHeading from '../../ui/main/TextHeading';
import OutlinedButton from '../../ui/main/OutlinedButton';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');


    const handleResetPassword = () => {
        if (email.trim() === '') {
            Alert.alert('Error sending password reset email', 'Please enter your email address');
        } else {
            forgotPassword(email)
                .catch((error) => {
                    Alert.alert('Error sending password reset email', error);
                })
        }
    };

    const handleBackToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <Container>
            <TextHeading>Forgot Password</TextHeading>
            <CustomTextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Button onPress={handleResetPassword}>Reset Password</Button>
            <OutlinedButton onPress={handleBackToLogin}>Back to Login</OutlinedButton>
        </Container >

    );
};

export default ForgotPasswordScreen;
