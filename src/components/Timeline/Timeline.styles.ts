'use client';
import styled, { css } from 'styled-components';

export interface StyledTimelineProps {
  $mode: 'left' | 'right' | 'alternate';
  $reverse?: boolean;
}

export interface StyledTimelineItemProps {
  $position?: 'left' | 'right';
  $color?: string;
  $isLast?: boolean;
}

// The main timeline container
export const StyledTimeline = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$mode', '$reverse'].includes(prop),
})<StyledTimelineProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 16px 0;
  width: 100%;

  ${({ $reverse }) =>
    $reverse &&
    css`
      flex-direction: column-reverse;
    `}
`;

// The vertical line (connector)
export const TimelineConnector = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$reverse',
})<{
  $mode: 'left' | 'right' | 'alternate';
  $reverse?: boolean;
}>`
  position: absolute;
  top: 16px;
  bottom: 16px;
  width: 2px;
  background: ${({ theme }) => `${theme.colors.text}30`};

  ${({ $mode }) =>
    $mode === 'left'
      ? css`
          left: 20px;
        `
      : $mode === 'right'
        ? css`
            right: 20px;
          `
        : css`
            left: 50%;
            transform: translateX(-50%);
          `}
`;

// Individual timeline item wrapper
export const StyledTimelineItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$position', '$color', '$isLast', '$mode'].includes(prop),
})<
  StyledTimelineItemProps & {
    $mode: 'left' | 'right' | 'alternate';
  }
>`
  display: flex;
  position: relative;
  margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '32px')};
  align-items: flex-start;

  ${({ $mode, $position }) => {
    const resolvedPosition = $position || $mode;
    const actualPosition = resolvedPosition === 'left' ? 'left' : 'right';

    if ($mode === 'left') {
      return css`
        padding-left: 64px;
        justify-content: flex-start;
      `;
    }

    if ($mode === 'right') {
      return css`
        padding-right: 64px;
        justify-content: flex-end;
      `;
    }

    // alternate mode
    return actualPosition === 'left'
      ? css`
          padding-right: calc(50% + 48px);
          justify-content: flex-end;
        `
      : css`
          padding-left: calc(50% + 48px);
          justify-content: flex-start;
        `;
  }}
`;

// The dot/circle on the timeline line
export const TimelineDot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$position', '$mode', '$color', '$isLast'].includes(prop),
})<
  Omit<StyledTimelineItemProps, '$isLast'> & {
    $mode: 'left' | 'right' | 'alternate';
  }
>`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color, theme }) => $color || theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $mode, $position }) => {
    const _resolvedPosition = $position || $mode;

    if ($mode === 'left') {
      return css`
        left: 12px;
        transform: translateX(0);
      `;
    }

    if ($mode === 'right') {
      return css`
        right: 12px;
        transform: translateX(0);
      `;
    }

    // alternate mode
    return css`
      left: 50%;
      transform: translateX(-50%);
    `;
  }}
`;

// Container for custom dot content (if provided)
export const TimelineDotContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  
  svg {
    width: 10px;
    height: 10px;
  }
`;

// The label/timestamp section
export const TimelineLabel = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$position', '$mode'].includes(prop),
})<{
  $position?: 'left' | 'right';
  $mode: 'left' | 'right' | 'alternate';
}>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ $mode, $position }) => {
    const resolvedPosition = $position || $mode;

    if ($mode === 'left') {
      return css`
        position: absolute;
        left: 40px;
        top: 0;
        text-align: right;
        min-width: 120px;
      `;
    }

    if ($mode === 'right') {
      return css`
        position: absolute;
        right: 40px;
        top: 0;
        text-align: left;
        min-width: 120px;
      `;
    }

    // alternate mode
    return resolvedPosition === 'left'
      ? css`
          text-align: right;
          margin-right: 24px;
          flex: 1;
        `
      : css`
          text-align: left;
          margin-left: 24px;
          flex: 1;
          order: 2;
        `;
  }}
`;

// The content card/box
export const TimelineContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$mode', '$position', '$isLast', '$hasLabel'].includes(prop),
})<{
  $mode: 'left' | 'right' | 'alternate';
  $position?: 'left' | 'right';
  $isLast?: boolean;
}>`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 16px 20px;
  flex: 1;
  max-width: 100%;
  position: relative;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) =>
      `7px 7px 20px ${theme.colors.shadowDark}, -7px -7px 20px ${theme.colors.shadowLight}`};
  }

  ${({ $mode, $position }) => {
    const resolvedPosition = $position || $mode;

    if ($mode === 'left') {
      return css`
        margin-left: 0;
      `;
    }

    if ($mode === 'right') {
      return css`
        margin-right: 0;
      `;
    }

    // alternate mode - order content based on position
    return resolvedPosition === 'right'
      ? css`
          order: 1;
        `
      : css`
          order: 2;
        `;
  }}
`;

// Wrapper for label + content in alternate mode
export const TimelineItemInner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$mode', '$position'].includes(prop),
})<{
  $mode: 'left' | 'right' | 'alternate';
  $position?: 'left' | 'right';
}>`
  display: flex;
  align-items: flex-start;
  flex: 1;
  max-width: calc(50% - 32px);

  ${({ $mode, $position }) => {
    const resolvedPosition = $position || $mode;

    if ($mode === 'alternate') {
      return resolvedPosition === 'left'
        ? css`
            justify-content: flex-end;
          `
        : css`
            justify-content: flex-start;
          `;
    }

    return css`
      max-width: 100%;
      width: 100%;
    `;
  }}
`;

// Wrapper for the entire item row (including dot)
export const TimelineItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
`;
