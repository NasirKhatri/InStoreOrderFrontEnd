import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const UploadImage = async (setImage) => {

    getFileSize = async fileUri => {
        let fileInfo = await FileSystem.getInfoAsync(fileUri);
        let fileSize = fileInfo.size / 1024 / 1024;
        return fileSize;
      };
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        const fileSize = await getFileSize(result.uri);
        const fileName = result.uri.split('/').pop();
        const fileExtension = result.uri.split('.').pop();
        const Image = {
            filename: fileName,
            uri: result.uri,
            type: `image/${fileExtension}`
        }
        fileSize > 5 ? alert('File Is Too Big (Max 5 mb File Allowed)') : setImage('Image', Image);
    }
}