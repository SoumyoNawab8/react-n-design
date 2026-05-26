'use client';

import type React from 'react';
import { useCallback } from 'react';
import { motion } from '../../utils/lazyMotion';
import { SegmentedItem, SegmentedWrapper } from './Segmented.styles';

export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
}

export const Segmented: React.FC<SegmentedProps> = ({
  options,
  value,
  onChange,
  size = 'medium',
  block = false,
}) => {
  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange]
  );

  return (
    <SegmentedWrapper $size={size} $block={block} role="tablist">
      {options.map((option) => (
        <SegmentedItem
          key={option.value}
          as={motion.button}
          $active={value === option.value}
          $size={size}
          $block={block}
          disabled={option.disabled}
          onClick={() => handleSelect(option.value)}
          role="tab"
          aria-selected={value === option.value}
          aria-disabled={option.disabled}
          whileTap={!option.disabled ? { scale: 0.98 } : {}}
        >
          {value === option.value && (
            <motion.div
              layoutId="segmented-active"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'white',
                borderRadius: '4px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                zIndex: 0,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>{option.label}</span>
        </SegmentedItem>
      ))}
    </SegmentedWrapper>
  );
};
