'use client';
import styled, { css, keyframes } from 'styled-components';

const stepReveal = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const thinkingPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

export const AIThinkingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  box-sizing: border-box;
  gap: 12px;
`;

export const AIThinkingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

export const AIThinkingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  animation: ${thinkingPulse} 2s ease-in-out infinite;
`;

export const AIThinkingTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const AIThinkingToggle = styled.span`
  margin-left: auto;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.7;
`;

export const AIThinkingSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
`;

export const AIThinkingStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.85;
  animation: ${stepReveal} 0.3s ease-out;
`;

export const AIThinkingStepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const AIThinkingStepText = styled.span`
  flex: 1;
  word-break: break-word;
`;

export const AIThinkingActiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${thinkingPulse} 1.5s ease-in-out infinite;
`;

export const AIThinkingElapsed = styled.span`
  font-size: 12px;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  margin-left: auto;
`;
