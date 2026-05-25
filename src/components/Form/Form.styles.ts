import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => (theme as any).shadows.soft};
  box-sizing: border-box;
`;

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ErrorText = styled(motion.p)`
  font-size: 12px;
  color: #e53e3e;
  margin: 0;
  margin-top: 4px;
`;
