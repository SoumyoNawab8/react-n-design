'use client';
import type React from 'react';
import { useMemo } from 'react';
import {
  AudioWaveformWrapper,
  AudioWaveformBar,
} from './AudioWaveform.styles';

export interface AudioWaveformProps {
  bars?: number;
  amplitude?: number;
  isActive?: boolean;
  barGap?: number;
  className?: string;
}

export const AudioWaveform = ({
  bars = 40,
  amplitude = 0.5,
  isActive = false,
  barGap = 2,
  className,
}: AudioWaveformProps) => {
  const barHeights = useMemo(() => {
    // Generate deterministic pseudo-random heights using a simple LCG
    // so they don't shift on every render
    const heights: number[] = [];
    let seed = 12345;
    for (let i = 0; i < bars; i++) {
      seed = (seed * 16807 + 0) % 2147483647;
      const random = (seed - 1) / 2147483646; // 0..1
      const minHeight = 0.15;
      const maxHeight = minHeight + (1 - minHeight) * amplitude;
      heights.push(minHeight + random * (maxHeight - minHeight));
    }
    return heights;
  }, [bars, amplitude]);

  return (
    <AudioWaveformWrapper
      className={className}
      role="img"
      aria-label={isActive ? 'Audio waveform active' : 'Audio waveform'}
      $barGap={barGap}
      data-testid="audio-waveform"
    >
      {barHeights.map((height, index) => (
        <AudioWaveformBar
          key={index}
          $height={height}
          $isActive={isActive}
          $animationDelay={`${index * 0.05}s`}
          data-testid="audio-waveform-bar"
        />
      ))}
    </AudioWaveformWrapper>
  );
};
