'use client';
import type React from 'react';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import { useFormContext } from './FormContext';
import { ErrorText } from './Form.styles';

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
        <motion.div
          key={`error-${fieldName}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '12px', color: '#e53e3e', marginTop: '4px' }}
          id={`form-field-${fieldName}-error`}
        >
          {Array.isArray(error) ? error[0] : error}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
