import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    padding: 4px 8px;
    font-size: 10px;
    border-radius: 6px;
    gap: 4px;
  `,
  medium: css`
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 8px;
    gap: 6px;
  `,
};

export const TagIcon = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const CloseIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  margin-right: -4px; /* Compensate for padding */
  cursor: pointer;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  font-size: 1.1em;
  transition: background-color 0.2s;

  &:hover {
    /* 2. Use a theme-aware hover color */
    background-color: ${({ theme }) => theme.colors.hoverBg};
  }
`;

export const StyledTag = styled.span<{
  size: 'small' | 'medium';
  variant: 'primary' | 'default' | 'outline';
  customColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  ${({ size }) => sizes[size]};

  /* 3. Access theme from props */
  ${({ variant, customColor, theme }) => {
    const color = customColor || (variant === 'primary' ? theme.colors.primary : theme.colors.text);

    if (variant === 'outline') {
      return css`
        background: transparent;
        color: ${color};
        box-shadow: ${theme.shadows.softInset};
        border: 1px solid ${color};
      `;
    }

    return css`
      background: ${theme.colors.background};
      color: ${color};
      box-shadow: ${theme.shadows.soft};
    `;
  }}
`;