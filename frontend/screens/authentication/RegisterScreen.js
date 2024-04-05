import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../ui/main/Container'
import Details from '../../ui/profile/Details'

const RegisterScreen = () => {
    return (
        <Container>
            <Details
                isEditing={true}
            />
        </Container>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})