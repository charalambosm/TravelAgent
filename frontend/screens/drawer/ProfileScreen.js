import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Details from '../../ui/profile/Details'

const ProfileScreen = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            styles={styles.keyboardAvoidingView}
            keyboardVerticalOffset={80}
        >
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                >
                    <Details />
                </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    keyboardAvoidingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})