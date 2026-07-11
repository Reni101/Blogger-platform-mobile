import { useEffect, useState } from 'react';
import { decodeJwtPayload, SecureStorage } from '../../../shared';

type AccessTokenPayload = {
  deviceId?: string;
};

export function useCurrentDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    SecureStorage.get<string>('accessToken')
      .then(accessToken => {
        if (!isMounted || !accessToken) {
          return;
        }

        const payload = decodeJwtPayload<AccessTokenPayload>(accessToken);
        setDeviceId(payload?.deviceId ?? null);
      })
      .catch(() => {
        // Ignore storage read errors.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return deviceId;
}
