import { DomainException } from '../types';
import axios from 'axios';

function isDomainException(data: unknown): data is DomainException {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.timestamp === 'string' &&
    typeof candidate.path === 'string' &&
    typeof candidate.code === 'number' &&
    Array.isArray(candidate.errorsMessages)
  );
}

export function getDomainException(error: unknown): DomainException | null {
  if (axios.isAxiosError(error) && isDomainException(error.response?.data)) {
    return error.response.data;
  }
  if (isDomainException(error)) {
    return error;
  }
  return null;
}
