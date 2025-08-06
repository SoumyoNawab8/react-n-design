import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const sizes = {
  small: { wrapperWidth: '40px', wrapperHeight: '22px', knobSize: '16px' },
  medium: { wrapperWidth: '50px', wrapperHeight: '28px', knobSize: '20px' },
  large: { wrapperWidth: '60px', wrapperHeight: '34px', knobSize: '26px' },
};

export const SwitchContainer = styled.div<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const LabelText = styled.span`
  /* 2. Access theme from props */
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  user-select: none; /* Prevents text selection on click */
`;

export const SwitchWrapper = styled.div<{ size: 'small' | 'medium' | 'large'; disabled: boolean }>`
  width: ${({ size }) => sizes[size].wrapperWidth};
  height: ${({ size }) => sizes[size].wrapperHeight};
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 4px;
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  transition: background-color 0.2s ease-in-out;
  transform: translateZ(0); /* Promotes to new layer for better rendering */

  &[data-checked='true'] {
    justify-content: flex-end;
    background-color: ${({ theme }) => theme.colors.primary};
  }
  
  ${({ disabled }) => disabled && css`
    opacity: 0.6;
  `}
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

export const KnobSpinner = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 60%;
  height: 60%;
  animation: ${spin} 0.8s linear infinite;
`;

export const KnobIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.6em; /* Scale icon size relative to knob */
`;

export const SwitchKnob = styled(motion.div)<{ size: 'small' | 'medium' | 'large' }>`
  width: ${({ size }) => sizes[size].knobSize};
  height: ${({ size }) => sizes[size].knobSize};
  /* 3. Make knob theme-aware */
  background-color: ${({ theme }) => (theme as any).colors.knobBg};
  border-radius: 50%;
  box-shadow: 3px 3px 6px ${({ theme }) => (theme as any).colors.shadowDark}, -3px -3px 6px ${({ theme }) => (theme as any).colors.shadowLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;