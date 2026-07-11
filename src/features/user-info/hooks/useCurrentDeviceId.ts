import { useEffect, useState } from 'react';
import { decodeJwtPayload } from '../../../shared';
import { useAuthStore } from '../../auth';

type AccessTokenPayload = {
  deviceId?: string;
};

export function useCurrentDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const accessToken = useAuthStore(s => s.accessToken);

  useEffect(() => {
    let isMounted = true;

    if (!isMounted || !accessToken) {
      return;
    }

    const payload = decodeJwtPayload<AccessTokenPayload>(accessToken);
    setDeviceId(payload?.deviceId ?? null);

    return () => {
      isMounted = false;
    };
  }, []);

  return deviceId;
}
