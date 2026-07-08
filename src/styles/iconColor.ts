import { css } from 'styled-components';

/**
 * Forces child SVG elements to inherit the current text color of their parent.
 * Apply to icon wrapper elements so icons respond to theme changes even when
 * the passed icon uses a hardcoded fill or stroke.
 */
export const iconColor = css`
  & svg,
  & svg path,
  & svg circle,
  & svg rect,
  & svg line,
  & svg polyline,
  & svg polygon {
    fill: currentColor;
    stroke: currentColor;
  }
`;
