import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../ui/main/CustomTextInput'
import Button from '../main/Button'
import OutlinedButton from '../main/OutlinedButton'
import { Colors } from '../../constants/colors'
import EditButton from './EditButton'

const Details = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isChangeEmail, setIsChangeEmail] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangeName, setIsChangeName] = useState(false);
    const [isChangeSurname, setIsChangeSurname] = useState(false);
    const [isChangePhoneNumber, setIsChangePhoneNumber] = useState(false);

    const showChangePassword = () => {
        setIsChangePassword(true);
    }

    const showChangeEmail = () => {
        setIsChangeEmail(true);
    }

    const saveProfile = () => {
        setIsEditing(false);
        setIsChangeEmail(false);
        setIsChangePassword(false);

    }

    const editProfile = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
        setIsChangeEmail(false);
        setIsChangePassword(false);
    }

    return (
        <>
            <View
                style={styles.profilePictureContainer}>
                {profilePicture ? (
                    <Image
                        source={{
                            uri: profilePicture
                        }}
                        style={styles.profilePicture}
                    />
                ) : (
                    <Image
                        source={require('../../assets/favicon.png')}
                        style={styles.profilePicture}
                    />
                )}
                <View style={styles.editIconContainer}>
                    <EditButton
                        isEditing={false}
                    />
                </View>
            </View>

            <View
                style={styles.editContainer}
            >
                <CustomTextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    inputMode='text'
                    editable={isChangeName}
                    style={{ marginRight: 10 }}
                />

                <EditButton
                    isEditing={isChangeName}
                />
            </View>

            <View
                style={styles.editContainer}
            >
                <CustomTextInput
                    placeholder="Surname"
                    value={surname}
                    onChangeText={setSurname}
                    inputMode='text'
                    editable={isChangeSurname}
                    style={{ marginRight: 10 }}
                />

                <EditButton
                    isEditing={isChangeSurname}
                />
            </View>

            <View
                style={styles.editContainer}
            >
                <CustomTextInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    inputMode='text'
                    editable={isChangePhoneNumber}
                    style={{ marginRight: 10 }}
                />

                <EditButton
                    isEditing={isChangePhoneNumber}
                />
            </View>

            <View
                style={styles.editContainer}
            >
                <CustomTextInput
                    placeholder="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    inputMode='text'
                    editable={isChangeEmail}
                    style={{ marginRight: 10 }}
                />

                <EditButton
                    isEditing={isChangeEmail}
                />
            </View>

            <Button
                onPress={showChangePassword}>
                Change Password
            </Button>

            <OutlinedButton>
                Delete Account
            </OutlinedButton>
        </>
    )
}

export default Details

const styles = StyleSheet.create({
    profilePictureContainer: {
        position: 'relative',
    },
    profilePicture: {
        width: 160,
        height: 160,
        borderRadius: 100,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 24,
    },
    editContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})