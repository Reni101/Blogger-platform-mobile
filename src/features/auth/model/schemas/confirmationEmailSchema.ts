import { z } from 'zod';

export const confirmationEmailSchema = z.object({
  code: z.string().trim().min(1, 'Confirmation code is required'),
});

export type ConfirmationEmailFormValues = z.infer<
  typeof confirmationEmailSchema
>;
