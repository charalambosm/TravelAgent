import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadProfilePicture = (profilePictureUri, displayName) => {
    return new Promise((resolve, reject) => {
        fetch(profilePictureUri)
            .then((response) => response.blob())
            .then((blob) => {
                const imageName = `${displayName}`;
                const ref = ref(storage,`profilePictures/${imageName}`);
                uploadBytes(ref, blob)
                    .then(() => {
                        ref.getDownloadURL()
                            .then((downloadURL) => {
                                resolve(downloadURL);
                            })
                    })
            })
    });
}