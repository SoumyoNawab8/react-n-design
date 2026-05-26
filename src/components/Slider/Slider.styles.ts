'use client';
import styled, { css } from 'styled-components';

export const SliderWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth', 'vertical'].includes(prop),
})<{ fullWidth?: boolean; vertical?: boolean }>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-width: 200px;

  ${({ vertical }) =>
    vertical &&
    css`
      flex-direction: row;
      align-items: center;
      height: 200px;
      min-width: auto;
      width: auto;
    `}
`;

export const SliderLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SliderValue = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  min-width: 32px;
  text-align: right;
`;

export const SliderTrack = styled.div.withConfig({
  shouldForwardProp: (prop) => !['vertical'].includes(prop),
})<{ vertical?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.shadowDark}40;
  border-radius: 999px;
  cursor: pointer;

  ${({ vertical }) =>
    vertical
      ? css`
          width: 6px;
          height: 100%;
          min-height: 100px;
        `
      : css`
          height: 6px;
          width: 100%;
          min-width: 120px;
        `}
`;

export const SliderFill = styled.div.withConfig({
  shouldForwardProp: (prop) => !['vertical'].includes(prop),
})<{ vertical?: boolean }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  pointer-events: none;

  ${({ vertical }) =>
    vertical
      ? css`
          bottom: 0;
          left: 0;
          width: 100%;
          height: var(--fill-percent, 0%);
        `
      : css`
          top: 0;
          left: 0;
          height: 100%;
          width: var(--fill-percent, 0%);
        `}
`;

export const SliderThumb = styled.div.withConfig({
  shouldForwardProp: (prop) => !['vertical'].includes(prop),
})<{ vertical?: boolean }>`
  position: absolute;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: grab;
  z-index: 2;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ vertical }) =>
    vertical
      ? css`
          left: 50%;
          bottom: var(--thumb-percent, 0%);
          transform: translate(-50%, 50%);
        `
      : css`
          top: 50%;
          left: var(--thumb-percent, 0%);
          transform: translate(-50%, -50%);
        `}

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.soft}, 0 0 0 4px ${({ theme }) => theme.colors.primary}25;
  }

  &:active {
    cursor: grabbing;
    transform: ${({ vertical }) =>
      vertical ? 'translate(-50%, 50%) scale(1.1)' : 'translate(-50%, -50%) scale(1.1)'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SliderMarks = styled.div.withConfig({
  shouldForwardProp: (prop) => !['vertical'].includes(prop),
})<{ vertical?: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  user-select: none;

  ${({ vertical }) =>
    vertical &&
    css`
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      margin-left: 12px;
    `}
`;

export const SliderMark = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  text-align: center;
`;

export const SliderError = styled.span`
  font-size: 12px;
  color: #e53e3e;
`;
