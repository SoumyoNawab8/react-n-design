'use client';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

export const StreamingTextWrapper = styled.div`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-size: inherit;
  line-height: inherit;
  word-break: break-word;
`;

export const StreamingTextCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
`;
