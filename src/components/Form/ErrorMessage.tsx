'use client';
import { AnimatePresence } from 'framer-motion';
import { ErrorText } from './Form.styles';
import { useFormContext } from './FormContext';

export interface ErrorMessageProps {
  name: string;
}

export const ErrorMessage = ({ name }: ErrorMessageProps) => {
  const ctx = useFormContext();
  if (!ctx) return null;

  const fieldName = String(name);
  const error = ctx.errors[fieldName];
  const touched = ctx.touched[fieldName];

  if (!error || !touched) return null;

  return (
    <AnimatePresence>
      {error && touched && (
        <ErrorText
          key={`error-${fieldName}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          id={`form-field-${fieldName}-error`}
        >
          {error}
        </ErrorText>
      )}
    </AnimatePresence>
  );
};
