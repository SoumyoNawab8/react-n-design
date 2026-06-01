/**
 * Inline SVG Icons for react-n-design
 * Replaces react-icons for smaller bundle size (~40KB reduction)
 */

import React from 'react';

export interface IconSvgProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

const createIcon = (children: React.ReactNode, viewBox = '0 0 24 24') =>
  React.forwardRef<SVGSVGElement, IconSvgProps>(
    ({ size = '1em', color = 'currentColor', className, ...props }, ref) => (
      // biome-ignore lint/a11y/noSvgWithoutTitle: icons are decorative; title should be handled by consumer via aria-label
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={viewBox}
        fill={color}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        {...props}
      >
        {children}
      </svg>
    )
  );

// Check icon
export const FaCheck = createIcon(
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />,
  '0 0 24 24'
);
export const Check = FaCheck;

// Times/Close icon
export const FaTimes = createIcon(
  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />,
  '0 0 24 24'
);
export const Times = FaTimes;

// TimesCircle/Error icon
export const FaTimesCircle = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-2-2 2-2-2-2 2-2 2 2 2-2 2 2-2 2 2 2-2 2-2-2-2 2z" />,
  '0 0 24 24'
);
export const TimesCircle = FaTimesCircle;

// CheckCircle/Success icon
export const FaCheckCircle = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />,
  '0 0 24 24'
);
export const CheckCircle = FaCheckCircle;

// ExclamationTriangle/Warning icon
export const FaExclamationTriangle = createIcon(
  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />,
  '0 0 24 24'
);
export const ExclamationTriangle = FaExclamationTriangle;

// InfoCircle icon
export const FaInfoCircle = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
  '0 0 24 24'
);
export const InfoCircle = FaInfoCircle;

// Copy icon
export const FaCopy = createIcon(
  <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />,
  '0 0 24 24'
);
export const Copy = FaCopy;

// PaperPlane/Send icon
export const FaPaperPlane = createIcon(
  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />,
  '0 0 24 24'
);
export const PaperPlane = FaPaperPlane;

// Robot icon
export const FaRobot = createIcon(
  <>
    <path d="M21 10V8C21 6.9 20.1 6 19 6H17V4C17 2.9 16.1 2 15 2H9C7.9 2 7 2.9 7 4V6H5C3.9 6 3 6.9 3 8V10C1.9 10 1 10.9 1 12V18C1 19.1 1.9 20 3 20H5V22H7V20H17V22H19V20H21C22.1 20 23 19.1 23 18V12C23 10.9 22.1 10 21 10ZM15 4V6H9V4H15ZM5 18H3V12H5V18ZM5 10V8H19V10H5ZM21 18H19V12H21V18Z" />
    <path d="M9 14H7V16H9V14ZM17 14H15V16H17V14Z" />
  </>,
  '0 0 24 24'
);
export const Robot = FaRobot;

// User icon
export const FaUser = createIcon(
  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />,
  '0 0 24 24'
);
export const User = FaUser;

// Home icon
export const FaHome = createIcon(
  <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />,
  '0 0 24 24'
);
export const Home = FaHome;

// ChevronLeft icon
export const FaChevronLeft = createIcon(
  <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" />,
  '0 0 24 24'
);
export const ChevronLeft = FaChevronLeft;

// ChevronRight icon
export const FaChevronRight = createIcon(
  <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" />,
  '0 0 24 24'
);
export const ChevronRight = FaChevronRight;

// ChevronDown icon
export const FaChevronDown = createIcon(
  <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" />,
  '0 0 24 24'
);
export const ChevronDown = FaChevronDown;

// ChevronUp icon
export const FaChevronUp = createIcon(
  <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" />,
  '0 0 24 24'
);
export const ChevronUp = FaChevronUp;

// ArrowUp icon
export const FaArrowUp = createIcon(
  <path d="M4 12L6 10L12 16L18 10L20 12L12 20L4 12Z" />,
  '0 0 24 24'
);
export const ArrowUp = FaArrowUp;

// ArrowDown icon
export const FaArrowDown = createIcon(
  <path d="M20 12L18 14L12 8L6 14L4 12L12 4L20 12Z" />,
  '0 0 24 24'
);
export const ArrowDown = FaArrowDown;

// Eye icon
export const FaEye = createIcon(
  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" />,
  '0 0 24 24'
);
export const Eye = FaEye;

// EyeSlash icon
export const FaEyeSlash = createIcon(
  <path d="M12 7C14.76 7 17 9.24 17 12C17 12.35 16.96 12.68 16.89 13L19.29 15.4C19.75 14.3 20.01 13.17 20.01 12C20.01 7.03 16.01 3 11.01 3C10.44 3 9.88 3.07 9.33 3.19L12.07 5.94L12 7ZM4 4.41L6.36 6.77C4.73 7.58 3.29 8.86 2.17 10.58C1.67 11.37 1.42 12.19 1.42 12C1.42 12.83 1.68 13.63 2.17 14.42C4.35 17.95 7.71 20 11.5 20C13.26 20 14.92 19.5 16.44 18.61L20.79 23L22.2 21.59L5.4 4.8L4 4.41ZM8.41 8.82L11.09 11.5C11.05 11.66 9.83 13.59 9.25 13.59C8.13 13.59 7.11 12.59 7.11 11.42C7.11 11.13 8.53 8.79 8.41 8.82ZM15.13 15.53L14 16.66L13.24 15.9C13.56 16.12 13.92 16.24 14.33 16.24C14.75 16.25 15.05 15.95 15.13 15.53Z" />,
  '0 0 24 24'
);
export const EyeSlash = FaEyeSlash;

// Brain icon
export const FaBrain = createIcon(
  <path d="M15.5 3C14.23 3 13.04 3.5 12.12 4.35C11.21 3.5 10.02 3 8.75 3C5.68 3 3.25 5.43 3.25 8.5C3.25 9.82 3.73 11.03 4.52 11.98C4.52 12 4.5 12 4.5 12C4.5 15.31 7.19 18 10.5 18C11.5 18 12.42 17.75 13.25 17.31C13.88 17.83 14.67 18.15 15.5 18.15C17.88 18.15 19.85 16.18 19.85 13.8C19.85 13.55 19.82 13.31 19.77 13.08C20.56 12.18 21.01 10.99 21.01 9.75C21.01 6.16 18.09 3.24 14.5 3.24L15.5 3Z" />,
  '0 0 24 24'
);
export const Brain = FaBrain;

// CloudUploadAlt icon
export const FaCloudUploadAlt = createIcon(
  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z" />,
  '0 0 24 24'
);
export const CloudUploadAlt = FaCloudUploadAlt;

// File icon
export const FaFile = createIcon(
  <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" />,
  '0 0 24 24'
);
export const File = FaFile;

// CalendarAlt icon
export const FaCalendarAlt = createIcon(
  <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" />,
  '0 0 24 24'
);
export const CalendarAlt = FaCalendarAlt;

// Calendar icon
export const FaCalendar = createIcon(
  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />,
  '0 0 24 24'
);
export const CalendarIcon = FaCalendar;

// Search icon
export const FaSearch = createIcon(
  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" />,
  '0 0 24 24'
);
export const Search = FaSearch;

// Sort icons for DataGrid
export const FaSort = createIcon(
  <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />,
  '0 0 24 24'
);
export const Sort = FaSort;

export const FaSortUp = createIcon(
  <path d="M3 12h12l-6-6-6 6zM3 18h18v-2H3v2zM3 22h18v-2H3v2z" />,
  '0 0 24 24'
);
export const SortUp = FaSortUp;

export const FaSortDown = createIcon(
  <path d="M3 12h12l-6 6-6-6zM3 18h18v-2H3v2zM3 22h18v-2H3v2z" />,
  '0 0 24 24'
);
export const SortDown = FaSortDown;

// Filter icon
export const FaFilter = createIcon(
  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />,
  '0 0 24 24'
);
export const Filter = FaFilter;

// ArrowRight icon
export const FaArrowRight = createIcon(
  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />,
  '0 0 24 24'
);
export const ArrowRight = FaArrowRight;

// Bell icon
export const FaBell = createIcon(
  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />,
  '0 0 24 24'
);
export const Bell = FaBell;

// Cog/Settings icon
export const FaCog = createIcon(
  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />,
  '0 0 24 24'
);
export const Cog = FaCog;

// Trash icon
export const FaTrash = createIcon(
  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />,
  '0 0 24 24'
);
export const Trash = FaTrash;

// Edit icon
export const FaEdit = createIcon(
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />,
  '0 0 24 24'
);
export const Edit = FaEdit;

// Plus icon
export const FaPlus = createIcon(<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />, '0 0 24 24');
export const Plus = FaPlus;

// Upload icon
export const FaUpload = createIcon(
  <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm9 2H6v2h12v-2z" />,
  '0 0 24 24'
);
export const Upload = FaUpload;

// Download icon
export const FaDownload = createIcon(
  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />,
  '0 0 24 24'
);
export const Download = FaDownload;

// Database icon
export const FaDatabase = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />,
  '0 0 24 24'
);
export const Database = FaDatabase;

// Code icon
export const FaCode = createIcon(
  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />,
  '0 0 24 24'
);
export const Code = FaCode;

// Lock icon
export const FaLock = createIcon(
  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />,
  '0 0 24 24'
);
export const Lock = FaLock;

// Envelope icon
export const FaEnvelope = createIcon(
  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />,
  '0 0 24 24'
);
export const Envelope = FaEnvelope;

// Spinner icon
export const FaSpinner = createIcon(
  <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8z" />,
  '0 0 24 24'
);
export const Spinner = FaSpinner;

// Star icon
export const FaStar = createIcon(
  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />,
  '0 0 24 24'
);
export const Star = FaStar;

// Heart icon
export const FaHeart = createIcon(
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
  '0 0 24 24'
);
export const Heart = FaHeart;

// StarHalf icon
export const FaStarHalf = createIcon(
  <>
    <defs>
      <linearGradient id="halfStar">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfStar)"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </>,
  '0 0 24 24'
);
export const StarHalf = FaStarHalf;

// Empty Star icon (outlined)
export const FaRegStar = createIcon(
  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />,
  '0 0 24 24'
);
export const RegStar = FaRegStar;

// Bars/Hamburger menu icon
export const FaBars = createIcon(
  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />,
  '0 0 24 24'
);
export const Bars = FaBars;

// ExclamationCircle icon
export const FaExclamationCircle = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />,
  '0 0 24 24'
);
export const ExclamationCircle = FaExclamationCircle;

// Inbox/Empty icon
export const FaInbox = createIcon(
  <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z" />,
  '0 0 24 24'
);
export const Inbox = FaInbox;

// Minus icon (for resizable handle)
export const FaMinus = createIcon(<path d="M19 13H5v-2h14v2z" />, '0 0 24 24');
export const Minus = FaMinus;

// Clock icon
export const FaClock = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-3.5c-.28 0-.5-.22-.5-.5v-8c0-.28.22-.5.5-.5s.5.22.5.5v7.5H13c.28 0 .5.22.5.5s-.22.5-.5.5z" />,
  '0 0 24 24'
);
export const Clock = FaClock;

// Circle icon (for radio buttons)
export const FaCircle = createIcon(
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />,
  '0 0 24 24'
);
export const Circle = FaCircle;
