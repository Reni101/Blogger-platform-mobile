export const loginConstraints = {
  minLength: 3,
  maxLength: 10,
} as const;

export const passwordConstraints = {
  minLength: 6,
  maxLength: 20,
} as const;
