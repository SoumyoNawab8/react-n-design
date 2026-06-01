'use client';
import styled, { css, keyframes } from 'styled-components';

const waveAnimation = keyframes`
  0%, 100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
`;

export const AudioWaveformWrapper = styled.div<{
  $barGap: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $barGap }) => $barGap}px;
  height: 40px;
`;

export const AudioWaveformBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$height', '$isActive', '$animationDelay'].includes(prop),
})<{
  $height: number;
  $isActive: boolean;
  $animationDelay: string;
}>`
  width: 4px;
  min-height: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 9999px 9999px 0 0;
  transform-origin: bottom;
  transition: height 0.3s ease;

  ${({ $height, $isActive, $animationDelay }) =>
    $isActive
      ? css`
          height: ${$height * 100}%;
          animation: ${waveAnimation} 1.2s ease-in-out ${$animationDelay} infinite;
        `
      : css`
          height: ${Math.max($height * 20, 4)}px;
        `}
`;
