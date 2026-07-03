import { DomainExceptionCode } from '../consts/domain-exception-codes.ts';

export type FieldError = {
  field: string;
  message: string;
};

export type DomainException = {
  timestamp: string;
  path: string;
  code: DomainExceptionCode;
  message?: string;
  errorsMessages: FieldError[];
};
