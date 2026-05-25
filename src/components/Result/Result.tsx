'use client';
import type React from 'react';
import { useState } from 'react';
import { motion } from '../../utils/lazyMotion';
import {
  ResultContainer,
  ResultIcon,
  ResultTitle,
  ResultSubtitle,
  ResultExtra,
} from './Result.styles';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaInbox,
} from '../../icons';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * The status of the result which determines the icon and color.
   * @default 'info'
   */
  status?: ResultStatus;
  /**
   * The title text.
   */
  title?: React.ReactNode;
  /**
   * The subtitle or description text.
   */
  subTitle?: React.ReactNode;
  /**
   * Extra content to display below the subtitle (typically actions).
   */
  extra?: React.ReactNode;
  /**
   * Custom icon to override the default one based on status.
   */
  icon?: React.ReactNode;
}

const statusIcons: Record<ResultStatus, React.ReactNode> = {
  success: <FaCheckCircle />,
  error: <FaTimesCircle />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
  '404': <FaInbox />,
  '403': <FaExclamationTriangle />,
  '500': <FaTimesCircle />,
};

const statusLabels: Record<ResultStatus, string> = {
  success: 'Success',
  error: 'Error',
  info: 'Information',
  warning: 'Warning',
  '404': 'Not Found',
  '403': 'Forbidden',
  '500': 'Server Error',
};

/**
 * A component for displaying result states: success, error, warning, info,
 * and empty states (404, 403, 500) with icon, title, and subtitle.
 */
export const Result = ({
  status = 'info',
  title,
  subTitle,
  extra,
  icon,
  ...props
}: ResultProps) => {
  const resultIcon = icon || statusIcons[status];
  const label = statusLabels[status];

  return (
    <ResultContainer
      role="status"
      aria-live="polite"
      aria-label={label}
      {...props}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ResultIcon status={status}>{resultIcon}</ResultIcon>
      </motion.div>
      
      {title && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <ResultTitle>{title}</ResultTitle>
        </motion.div>
      )}
      
      {subTitle && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <ResultSubtitle>{subTitle}</ResultSubtitle>
        </motion.div>
      )}
      
      {extra && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <ResultExtra>{extra}</ResultExtra>
        </motion.div>
      )}
    </ResultContainer>
  );
};