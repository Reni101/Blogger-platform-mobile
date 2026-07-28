import { type Asset } from 'react-native-image-picker';
import { api } from '../../../shared/api';

type AvatarFile = {
  uri: string;
  type: string;
  name: string;
};

export class AvatarApi {
  static async uploadAvatar(file: Asset) {
    if (!file.uri) {
      throw new Error('Avatar file URI is missing');
    }

    const formData = new FormData();
    const avatarFile: AvatarFile = {
      uri: file.uri,
      type: file.type ?? 'image/jpeg',
      name: file.fileName ?? 'avatar.jpg',
    };

    formData.append('file', avatarFile as unknown as Blob);

    return api.post('/user/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async getAvatar(){

  }
}
