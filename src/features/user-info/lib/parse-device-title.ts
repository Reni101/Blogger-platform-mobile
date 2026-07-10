export type DevicePlatform = 'android' | 'apple' | 'browser' | 'unknown';

export type ParsedDeviceTitle = {
  platform: DevicePlatform;
  displayTitle: string;
};

const PLATFORM_PREFIXES: Record<string, DevicePlatform> = {
  android: 'android',
  apple: 'apple',
  browser: 'browser',
};

export function parseDeviceTitle(title: string): ParsedDeviceTitle {
  const [rawPlatform, ...rest] = title.trim().split(/\s+/);
  const normalizedPlatform = rawPlatform?.toLowerCase() ?? '';
  const platform = PLATFORM_PREFIXES[normalizedPlatform] ?? 'unknown';
  const displayTitle =
    platform === 'unknown'
      ? title.trim()
      : rest.join(' ').trim() || title.trim();

  return { platform, displayTitle };
}
