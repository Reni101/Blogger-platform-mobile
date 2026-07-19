import { Alert } from 'react-native';
import {
  type Asset,
  type CameraOptions,
  type ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const pickerOptions: CameraOptions & ImageLibraryOptions = {
  mediaType: 'photo',
  cameraType: 'front',
  quality: 0.8,
  maxWidth: 1024,
  maxHeight: 1024,
  selectionLimit: 1,
  includeBase64: false,
  saveToPhotos: false,
};

const getPickedAsset = async (
  launch: typeof launchCamera | typeof launchImageLibrary,
): Promise<Asset | null> => {
  const response = await launch(pickerOptions);

  if (response.didCancel) {
    return null;
  }

  if (response.errorCode) {
    const message =
      response.errorCode === 'permission'
        ? 'Permission is required to access the camera or photo library.'
        : response.errorMessage ?? 'Failed to pick an image.';

    Alert.alert('Unable to pick photo', message);
    return null;
  }

  return response.assets?.[0] ?? null;
};

export const pickAvatarFromCamera = () => getPickedAsset(launchCamera);

export const pickAvatarFromLibrary = () => getPickedAsset(launchImageLibrary);
