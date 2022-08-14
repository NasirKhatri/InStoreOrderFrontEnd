import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const UploadImage = async (setImage) => {

    getFileSize = async fileUri => {
        let fileInfo = await FileSystem.getInfoAsync(fileUri);
        let fileSize = fileInfo.size / 1024 / 1024;
        return fileSize;
      };
    // https://docs.expo.dev/versions/v45.0.0/sdk/imagepicker/
    // https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        const fileSize = await getFileSize(result.uri);
        fileSize > 5 ? alert('File Is Too Big (Max 5 mb File Allowed)') : setImage('Image', {...result, fileSize: fileSize});
    }
}