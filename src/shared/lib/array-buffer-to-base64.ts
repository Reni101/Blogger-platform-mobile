const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let result = '';

  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i] ?? 0;
    const b = bytes[i + 1] ?? 0;
    const c = bytes[i + 2] ?? 0;
    const hasB = i + 1 < bytes.length;
    const hasC = i + 2 < bytes.length;

    result += BASE64_CHARS[a >> 2];
    result += BASE64_CHARS[((a & 3) << 4) | (b >> 4)];
    result += hasB ? BASE64_CHARS[((b & 15) << 2) | (c >> 6)] : '=';
    result += hasC ? BASE64_CHARS[c & 63] : '=';
  }

  return result;
};
