import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'react-n-design';
import styled from 'styled-components';

interface ComponentCardProps {
  name: string;
  description: string;
  onClick: () => void;
}

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const ComponentCard: React.FC<ComponentCardProps> = ({ name, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Card hoverable padding="medium" onClick={onClick} style={{ cursor: 'pointer' }}>
        <CardTitle>{name}</CardTitle>
        <CardDesc>{description}</CardDesc>
      </Card>
    </motion.div>
  );
};

export { ComponentCard };
export default ComponentCard;
