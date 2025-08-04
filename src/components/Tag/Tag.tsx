import React from 'react';
import { StyledTag, TagIcon, CloseIcon } from './Tag.styles';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium';
  /**
   * The visual style of the tag.
   */
  variant?: 'primary' | 'default' | 'outline';
  /**
   * Icon to display before the tag's text.
   */
  leftIcon?: React.ReactNode;
  /**
   * Callback function for when the close icon is clicked. Renders a close icon if provided.
   */
  onClose?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /**
   * Overrides the default component color. Accepts any valid CSS color.
   */
  color?: string;
}

/**
 * An advanced neomorphic tag for keywords, with icons, custom colors, and a dismissible state.
 */
export const Tag = ({
  children,
  size = 'medium',
  variant = 'default',
  leftIcon,
  onClose,
  color,
  ...props
}: TagProps) => {
  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); // Prevent tag's onClick from firing
    onClose?.(e);
  };

  return (
    <StyledTag size={size} variant={variant} customColor={color} {...props}>
      {leftIcon && <TagIcon>{leftIcon}</TagIcon>}
      {children}
      {onClose && <CloseIcon onClick={handleClose}>&times;</CloseIcon>}
    </StyledTag>
  );
};