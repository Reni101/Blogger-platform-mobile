import { getBrand, getModel } from 'react-native-device-info';

const APPLE_BRANDS = new Set(['apple']);

export const getDeviceName = () => {
  const brand = getBrand().trim();
  const model = getModel().trim();

  if (APPLE_BRANDS.has(brand.toLowerCase())) {
    return `Apple ${model}`;
  }

  return `Android ${brand} ${model}`.replace(/\s+/g, ' ').trim();
};
