'use client';
import styled, { css } from 'styled-components';

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 280px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const ColorPreview = styled.div.withConfig({
  shouldForwardProp: (prop) => !['color'].includes(prop),
})<{ color: string }>`
  width: 100%;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ color }) => color};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  border: 2px solid ${({ theme }) => theme.colors.shadowDark}40;
  transition: background 0.2s ease;
`;

export const ColorInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ColorLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ColorHexInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: none;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  font-family: monospace;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-sizing: border-box;

  &:focus {
    box-shadow: ${({ theme }) => `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }

  &::placeholder {
    color: #a0a5b0;
  }
`;

export const ColorSliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ColorSliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ColorSliderLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  width: 16px;
  text-align: center;
  font-family: monospace;
`;

export const ColorSliderTrack = styled.div`
  flex: 1;
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.shadowDark}40;
`;

export const ColorSliderFill = styled.div.withConfig({
  shouldForwardProp: (prop) => !['progress'].includes(prop),
})<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
`;

export const ColorSliderInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const ColorSliderValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  width: 28px;
  text-align: right;
  font-family: monospace;
`;

export const ColorSwatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ColorSwatch = styled.button.withConfig({
  shouldForwardProp: (prop) => !['color', 'isSelected'].includes(prop),
})<{ color: string; isSelected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ color }) => color};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  position: relative;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      box-shadow: ${theme.shadows.soft}, 0 0 0 2px ${theme.colors.background},
        0 0 0 4px ${theme.colors.primary};
    `}

  &:hover {
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
