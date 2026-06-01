import styled from 'styled-components';

export const OrgChartContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
  overflow: auto;
`;

export const OrgTree = styled.ul<{ $isRoot?: boolean }>`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  list-style: none;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: ${({ $isRoot }) => ($isRoot ? '0' : '20px')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    border-left: 2px solid ${({ theme }) => theme.colors.border};
    width: 0;
    height: 20px;
    transform: translateX(-50%);
    display: ${({ $isRoot }) => ($isRoot ? 'none' : 'block')};
  }
`;

export const OrgTreeNode = styled.li<{ $isRoot?: boolean }>`
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: ${({ $isRoot }) => ($isRoot ? '0 8px 0 8px' : '20px 8px 0 8px')};
  flex: 0 0 auto;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 2px solid ${({ theme }) => theme.colors.border};
    width: 50%;
    height: 20px;
    display: ${({ $isRoot }) => ($isRoot ? 'none' : 'block')};
  }

  &::after {
    right: auto;
    left: 50%;
    border-left: 2px solid ${({ theme }) => theme.colors.border};
  }

  /* Remove connectors from single child */
  &:only-child::after,
  &:only-child::before {
    display: none;
  }

  &:only-child {
    padding-top: 0;
  }

  /* Remove left connector from first child */
  &:first-child::before {
    border: 0 none;
  }

  /* Remove right connector from last child */
  &:last-child::after {
    border: 0 none;
  }

  /* Add back vertical connector for last child */
  &:last-child::before {
    border-right: 2px solid ${({ theme }) => theme.colors.border};
    border-top-right-radius: 6px;
  }

  /* Add radius for first child */
  &:first-child::after {
    border-top-left-radius: 6px;
  }
`;

export const NodeCard = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  min-width: 140px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.strong};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const NodeAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

export const NodeAvatarPlaceholder = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 18px;
  font-weight: 600;
`;

export const NodeLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const NodeRole = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
