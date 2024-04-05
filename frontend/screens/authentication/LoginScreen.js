import React, { useState } from 'react'
import { Alert } from 'react-native';
import { login, register } from '../../util/auth'
import Container from '../../ui/main/Container'
import CustomTextInput from '../../ui/main/CustomTextInput'
import Button from '../../ui/main/Button'
import OutlinedButton from '../../ui/main/OutlinedButton'
import TextHeading from '../../ui/main/TextHeading'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function handleSignUp() {
        register(email, password).catch((error) => {
            Alert.alert('Error registering user', error)
        })
    }

    function handleLogin() {
        login(email, password).catch((error) => {
            Alert.alert('Error logging in', error)
        })
    }

    function handleForgotPassword() {
        navigation.navigate('ForgotPassword')
    }

    return (
        <Container>
            <TextHeading>Please enter your email and password:</TextHeading>
            <CustomTextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none' />
            <CustomTextInput
                placeholder='Password'
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry />
            <Button onPress={handleLogin}>Login</Button>
            <OutlinedButton onPress={handleSignUp}>Register</OutlinedButton>
            <OutlinedButton onPress={handleForgotPassword}>Forgot Password</OutlinedButton>
        </Container>
    )
}

export default LoginScreen