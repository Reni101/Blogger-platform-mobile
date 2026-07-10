import { getBrand, getModel } from 'react-native-device-info';

const APPLE_BRANDS = new Set(['apple']);

export const getDeviceName = () => {
  const brand = getBrand().trim();
  const model = getModel().trim();

  if (APPLE_BRANDS.has(brand.toLowerCase())) {
    return `apple ${model}`;
  }

  return `android ${brand} ${model}`.replace(/\s+/g, ' ').trim();
};
