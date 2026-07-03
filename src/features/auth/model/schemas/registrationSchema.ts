import { z } from 'zod';
import {
  loginConstraints,
  passwordConstraints,
} from '../consts/authConstraints.ts';

export const registrationSchema = z.object({
  login: z
    .string()
    .min(
      loginConstraints.minLength,
      `At least ${loginConstraints.minLength} characters`,
    )
    .max(
      loginConstraints.maxLength,
      `Maximum ${loginConstraints.maxLength} characters`,
    ),
  email: z.string().trim().email('Invalid email'),
  password: z
    .string()
    .min(
      passwordConstraints.minLength,
      `At least ${passwordConstraints.minLength} characters`,
    )
    .max(
      passwordConstraints.maxLength,
      `Maximum ${passwordConstraints.maxLength} characters`,
    ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
