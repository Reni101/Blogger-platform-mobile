function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';
  let buffer = 0;
  let bits = 0;

  for (const char of padded) {
    if (char === '=') {
      break;
    }

    const index = chars.indexOf(char);

    if (index === -1) {
      continue;
    }

    buffer = (buffer << 6) | index;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }

  return output;
}

export function decodeJwtPayload<T extends Record<string, unknown>>(
  token: string,
): T | null {
  try {
    const parts = token.split('.');

    if (parts.length !== 3) {
      return null;
    }

    const json = decodeBase64Url(parts[1]);

    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
