import { getDomainException } from '../../../shared';
import type { ConfirmationEmailFormValues } from '../model/schemas/confirmationEmailSchema.ts';

const CONFIRMATION_EMAIL_FIELDS: (keyof ConfirmationEmailFormValues)[] = [
  'code',
];

function isConfirmationEmailField(
  field: string,
): field is keyof ConfirmationEmailFormValues {
  return (CONFIRMATION_EMAIL_FIELDS as string[]).includes(field);
}
export const getConfirmationCodeErrorMessage = (error: unknown) => {
  const domainException = getDomainException(error);

  if (!domainException) {
    return 'Failed to confirm email. Please try again';
  }

  const codeFieldError = domainException.errorsMessages.find(({ field }) =>
    isConfirmationEmailField(field),
  );

  if (codeFieldError) {
    return codeFieldError.message;
  }

  return domainException.message ?? 'Failed to confirm email. Please try again';
};
