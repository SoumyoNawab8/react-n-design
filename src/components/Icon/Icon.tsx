'use client';
import type React from 'react';
import {
  FaArrowRight,
  FaBell,
  FaCalendar,
  FaCheck,
  FaCog,
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaLock,
  FaPlus,
  FaSearch,
  FaSpinner,
  FaStar,
  FaTimes,
  FaTrash,
  FaUpload,
  FaUser,
  CalendarIcon,
} from "../../icons";
import { IconContainer, StyledIcon } from './Icon.styles';

const iconMap: Record<string, React.ComponentType<any>> = {
  home: FaHome,
  user: FaUser,
  search: FaSearch,
  check: FaCheck,
  times: FaTimes,
  'arrow-right': FaArrowRight,
  star: FaStar,
  heart: FaHeart,
  bell: FaBell,
  cog: FaCog,
  trash: FaTrash,
  edit: FaEdit,
  plus: FaPlus,
  eye: FaEye,
  upload: FaUpload,
  download: FaDownload,
  lock: FaLock,
  envelope: FaEnvelope,
  calendar: CalendarIcon,
  info: FaInfoCircle,
  warning: FaExclamationTriangle,
  spinner: FaSpinner,
};

export interface IconProps {
  /** A react-icons component to render directly */
  icon?: React.ComponentType<any>;
  /** Predefined icon name from the built-in map */
  name?: string;
  /** Pixel size of the icon (default: 24) */
  size?: number;
  /** Explicit icon color. Falls back to theme text color when omitted. */
  color?: string;
  /** Neomorphic container variant */
  variant?: 'default' | 'circle' | 'square';
  /** Additional className for the outer container */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

/**
 * A neomorphic icon wrapper around react-icons.
 * Supports passing an icon component directly or selecting a predefined name.
 */
export const Icon = ({
  icon,
  name,
  size = 24,
  color,
  variant = 'default',
  className,
  ariaLabel,
}: IconProps) => {
  const IconComponent = icon || (name ? iconMap[name] : undefined);

  if (!IconComponent) {
    console.warn(`Icon: No icon found for name "${name}"`);
    return null;
  }

  return (
    <IconContainer variant={variant} size={size} className={className} aria-label={ariaLabel}>
      <StyledIcon size={size} color={color}>
        <IconComponent />
      </StyledIcon>
    </IconContainer>
  );
};
