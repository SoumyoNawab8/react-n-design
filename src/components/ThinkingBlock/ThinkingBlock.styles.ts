'use client';
import styled, { keyframes } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

const stepReveal = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const thinkingPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

export const ThinkingBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  box-sizing: border-box;
  gap: 0;
`;

export const ThinkingBlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
  outline: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const ThinkingBlockIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const ThinkingBlockTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ThinkingBlockChevron = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.7;
  font-size: 12px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const ThinkingBlockContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
`;

export const ThinkingBlockSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 12px;
  position: relative;
  margin-top: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 25px;
    width: 2px;
    background: ${({ theme }) => `${theme.colors.text}15`};
    border-radius: 1px;
  }
`;

export const ThinkingBlockStep = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.85;
  position: relative;
  z-index: 1;
  animation: ${stepReveal} 0.3s ease-out;
`;

export const ThinkingBlockStepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const ThinkingBlockStepText = styled.span`
  flex: 1;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ThinkingBlockTimestamp = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.7;
`;

export const ThinkingBlockIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 12px;
  margin-top: 4px;
`;

export const ThinkingBlockIndicatorDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${thinkingPulse} 1.5s ease-in-out infinite;
  flex-shrink: 0;
`;

export const ThinkingBlockIndicatorText = styled.span`
  font-size: 12px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;
