import { z } from 'zod';
import { passwordConstraints } from '../consts/authConstraints.ts';

export const passwordRecoverySchema = z.object({
  email: z.string().trim().email('Invalid email'),
});

export type PasswordRecoveryFormValues = z.infer<typeof passwordRecoverySchema>;

export const newPasswordSchema = z.object({
  recoveryCode: z.string().trim().min(1, 'Recovery code is required'),
  newPassword: z
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

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
