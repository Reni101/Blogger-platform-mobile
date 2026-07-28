import { type Asset } from 'react-native-image-picker';
import { api } from '../../../shared/api';
import { arrayBufferToBase64 } from '../../../shared/lib/array-buffer-to-base64.ts';

type AvatarFile = {
  uri: string;
  type: string;
  name: string;
};

export type UserAvatar = {
  uri: string;
  mimeType: string;
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

  static async getAvatar(): Promise<UserAvatar | null> {
    const response = await api.get<ArrayBuffer>('/user/avatar', {
      responseType: 'arraybuffer',
      // Backend sends Cache-Control: max-age=3600; RN URL/OkHttp caches
      // would keep returning the first avatar after upload.
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
      params: {
        _t: Date.now(),
      },
    });

    const data = response.data;
    if (!data || data.byteLength === 0) {
      return null;
    }

    const mimeType =
      String(response.headers['content-type'] ?? 'image/jpeg')
        .split(';')[0]
        .trim() || 'image/jpeg';

    if (mimeType.includes('application/json')) {
      return null;
    }

    return {
      uri: `data:${mimeType};base64,${arrayBufferToBase64(data)}`,
      mimeType,
    };
  }
}
