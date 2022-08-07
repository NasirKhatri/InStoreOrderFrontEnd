import * as ImagePicker from 'expo-image-picker';

export const UploadImage = async (setImage) => {
    // https://docs.expo.dev/versions/v45.0.0/sdk/imagepicker/
    // https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        setImage(result);
    }
}