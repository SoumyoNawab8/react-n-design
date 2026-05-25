'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '../../utils/lazyMotion';
import {
  FloatButtonWrapper,
  FloatButtonContainer,
  MenuContainer,
  MenuItem,
} from './FloatButton.styles';

export interface FloatButtonMenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface FloatButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  menu?: FloatButtonMenuItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  tooltip?: string;
}

export const FloatButton: React.FC<FloatButtonProps> = ({
  icon,
  onClick,
  menu,
  position = 'bottom-right',
  tooltip,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (menu && menu.length > 0) {
      setIsOpen(!isOpen);
    } else {
      onClick?.();
    }
  };

  return (
    <FloatButtonWrapper ref={wrapperRef} $position={position}>
      <AnimatePresence>
        {isOpen && menu && (
          <MenuContainer
            as={motion.div}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {menu.map((item, index) => (
              <MenuItem
                key={index}
                as={motion.button}
                disabled={item.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!item.disabled) {
                    item.onClick();
                    setIsOpen(false);
                  }
                }}
                whileHover={!item.disabled ? { scale: 1.05 } : {}}
                whileTap={!item.disabled ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </MenuItem>
            ))}
          </MenuContainer>
        )}
      </AnimatePresence>
      <FloatButtonContainer
        as={motion.button}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={tooltip || 'Floating action button'}
        aria-expanded={isOpen}
      >
        {icon}
      </FloatButtonContainer>
    </FloatButtonWrapper>
  );
};
