'use client';

import { motion } from '../../utils/lazyMotion';
import { EmptyDescription, EmptyImage, EmptyWrapper } from './Empty.styles';

export interface EmptyProps {
  description?: React.ReactNode;
  image?: React.ReactNode;
  children?: React.ReactNode;
}

export const Empty = ({ description = 'No Data', image, children }: EmptyProps) => {
  return (
    <EmptyWrapper
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <EmptyImage>
        {image || (
          <svg
            width="64"
            height="41"
            viewBox="0 0 64 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g opacity="0.4">
              <path
                d="M51.2 0H12.8C5.732 0 0 5.732 0 12.8v15.4C0 35.268 5.732 41 12.8 41h38.4C58.268 41 64 35.268 64 28.2V12.8C64 5.732 58.268 0 51.2 0z"
                fill="#f5f5f5"
              />
              <path
                d="M34.4 14.8c-2.872 0-5.2 2.328-5.2 5.2s2.328 5.2 5.2 5.2 5.2-2.328 5.2-5.2-2.328-5.2-5.2-5.2z"
                fill="#d9d9d9"
              />
              <path d="M24.8 28.6l6.4-6.4 4 4 8-8 6.4 6.4v4H24.8v-4z" fill="#d9d9d9" />
            </g>
          </svg>
        )}
      </EmptyImage>
      {description && <EmptyDescription>{description}</EmptyDescription>}
      {children}
    </EmptyWrapper>
  );
};
