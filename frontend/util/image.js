import * as ImagePicker from 'expo-image-picker'

export const getImageUsingLibrary = () => {
    return new Promise((resolve, reject) => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        })
        .then((result) => {
            if(!result.canceled) {
                resolve(result.assets[0].uri);
            } else {
                reject('Did not select an image')
            }
        })
    })
}