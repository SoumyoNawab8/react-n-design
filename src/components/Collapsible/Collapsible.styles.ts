import { motion } from '../../utils/lazyMotion';
import styled from 'styled-components';

export const CollapsibleWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

export const CollapsibleTrigger = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: color 0.2s;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CollapsibleChevron = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  transform-origin: center;
`;

export const CollapsibleContent = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};

  & > div {
    padding: 4px 20px 20px 20px;
  }
`;
