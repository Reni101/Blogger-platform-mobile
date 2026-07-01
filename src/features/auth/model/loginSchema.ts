import { z } from 'zod';

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, 'At least 3 characters')
    .max(10, 'Maximum 10 characters'),
  password: z
    .string()
    .min(3, 'At least 3 characters')
    .max(10, 'Maximum 10 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
