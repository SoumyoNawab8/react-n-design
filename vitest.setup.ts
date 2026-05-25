import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';
import React from 'react';

expect.extend(matchers);

// Mock framer-motion AnimatePresence to skip exit animations in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: new Proxy({}, {
      get: (_, tag: string) => {
        return React.forwardRef((props: any, ref: any) => {
          const { children, ...rest } = props;
          const validProps = Object.fromEntries(
            Object.entries(rest).filter(([key]) => !['initial', 'animate', 'exit', 'transition', 'layoutId', 'whileTap'].includes(key))
          );
          return React.createElement(tag === 'default' ? 'div' : tag, { ...validProps, ref }, children);
        });
      },
    }),
  };
});
