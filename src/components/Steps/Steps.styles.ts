'use client';
import styled, { css } from 'styled-components';

// Size configurations
const sizes = {
  small: {
    icon: '28px',
    fontSize: '12px',
    titleFontSize: '12px',
    descriptionFontSize: '10px',
    gap: '16px',
    connectorThickness: '2px',
    iconFontSize: '12px',
  },
  default: {
    icon: '36px',
    fontSize: '14px',
    titleFontSize: '14px',
    descriptionFontSize: '12px',
    gap: '24px',
    connectorThickness: '3px',
    iconFontSize: '14px',
  },
  large: {
    icon: '48px',
    fontSize: '16px',
    titleFontSize: '16px',
    descriptionFontSize: '13px',
    gap: '32px',
    connectorThickness: '4px',
    iconFontSize: '18px',
  },
};

export const StepsWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['direction', 'size'].includes(prop),
})<{
  direction: 'horizontal' | 'vertical';
  size: 'small' | 'default' | 'large';
}>`
  display: flex;
  width: 100%;

  ${({ direction }) =>
    direction === 'vertical'
      ? css`
          flex-direction: column;
          align-items: flex-start;
        `
      : css`
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;

          @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            gap: ${sizes.default.gap};
          }
        `}
`;

export const StepsItem = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['direction', 'size', 'isActive', 'isCompleted', 'isClickable'].includes(prop),
})<{
  direction: 'horizontal' | 'vertical';
  size: 'small' | 'default' | 'large';
  isActive?: boolean;
  isCompleted?: boolean;
  isClickable?: boolean;
}>`
  display: flex;
  position: relative;
  flex-shrink: 0;

  ${({ direction, size }) =>
    direction === 'vertical'
      ? css`
          flex-direction: row;
          align-items: flex-start;
          padding-left: ${sizes[size].gap};
          padding-top: ${sizes[size].gap};
          padding-bottom: ${sizes[size].gap};
        `
      : css`
          flex-direction: column;
          align-items: center;
          flex: 1;
          text-align: center;

          &:not(:first-child) {
            padding-left: ${sizes[size].gap};
          }
          &:not(:last-child) {
            padding-right: ${sizes[size].gap};
          }

          @media (max-width: 768px) {
            flex-direction: row;
            align-items: flex-start;
            flex: none;
            padding: 0;
            width: 100%;
          }
        `}

  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  outline: none;

  ${({ isClickable }) =>
    isClickable &&
    css`
      &:hover {
        opacity: 0.8;
      }

      &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.primary};
        outline-offset: 2px;
        border-radius: 4px;
      }
    `}
`;

export const StepsItemIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['direction', 'size', 'isActive', 'isCompleted'].includes(prop),
})<{
  direction: 'horizontal' | 'vertical';
  size: 'small' | 'default' | 'large';
  isActive?: boolean;
  isCompleted?: boolean;
}>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 1;

  width: ${({ size }) => sizes[size].icon};
  height: ${({ size }) => sizes[size].icon};
  font-size: ${({ size }) => sizes[size].fontSize};

  ${({ direction, size }) =>
    direction === 'vertical'
      ? css`
          position: absolute;
          left: calc(${sizes[size].gap} / 2 - ${sizes[size].icon} / 2);
          top: calc(${sizes[size].gap} / 2);
        `
      : css`
          @media (max-width: 768px) {
            position: absolute;
            left: calc(${sizes[size].gap} / 2 - ${sizes[size].icon} / 2);
            top: 0;
          }
        `}

  ${({ isActive, isCompleted, theme }) => {
    if (isActive) {
      return css`
        background: ${theme.colors.primary};
        color: #fff;
        box-shadow: ${theme.shadows.soft};
      `;
    }
    if (isCompleted) {
      return css`
        background: ${theme.colors.primary};
        color: #fff;
      `;
    }
    return css`
      background: ${theme.colors.background};
      color: ${theme.colors.text};
      box-shadow: ${theme.shadows.softInset};
    `;
  }}
`;

export const StepsIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<{
  size: 'small' | 'default' | 'large';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => sizes[size].iconFontSize};
`;

export const StepsConnector = styled.div.withConfig({
  shouldForwardProp: (prop) => !['direction', 'size', 'isCompleted'].includes(prop),
})<{
  direction: 'horizontal' | 'vertical';
  size: 'small' | 'default' | 'large';
  isCompleted?: boolean;
}>`
  position: absolute;
  z-index: 0;
  transition: all 0.3s ease;

  ${({ direction, size, isCompleted, theme }) =>
    direction === 'vertical'
      ? css`
          left: calc(${sizes[size].gap} / 2 - ${sizes[size].connectorThickness} / 2);
          top: ${sizes[size].gap};
          width: ${sizes[size].connectorThickness};
          height: 100%;
          background: ${isCompleted ? theme.colors.primary : `${theme.colors.shadowDark}40`};
        `
      : css`
          top: calc(${sizes[size].icon} / 2 - ${sizes[size].connectorThickness} / 2);
          left: calc(50% + ${sizes[size].icon} / 2);
          right: calc(-50% + ${sizes[size].icon} / 2 + ${sizes[size].gap});
          height: ${sizes[size].connectorThickness};
          background: ${isCompleted ? theme.colors.primary : `${theme.colors.shadowDark}40`};

          @media (max-width: 768px) {
            left: calc(${sizes[size].gap} / 2 - ${sizes[size].connectorThickness} / 2);
            top: ${sizes[size].icon};
            width: ${sizes[size].connectorThickness};
            height: calc(100% - ${sizes[size].icon});
            right: auto;
          }
        `}
`;

export const StepsItemContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['direction'].includes(prop),
})<{
  direction: 'horizontal' | 'vertical';
}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ direction }) =>
    direction === 'vertical'
      ? css`
          margin-left: 12px;
          min-height: ${sizes.default.icon};
          align-items: flex-start;
          text-align: left;
        `
      : css`
          margin-top: 8px;

          @media (max-width: 768px) {
            margin-left: 0;
            margin-top: 0;
          }
        `}

  @media (max-width: 768px) {
    min-height: ${sizes.default.icon};
    align-items: flex-start;
    text-align: left;
    margin-left: calc(${sizes.default.gap} / 2 + ${sizes.default.icon} / 2 + 12px);
  }
`;

export const StepsItemTitle = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isCompleted'].includes(prop),
})<{
  isActive?: boolean;
  isCompleted?: boolean;
}>`
  font-weight: ${({ isActive }) => (isActive ? '600' : '500')};
  color: ${({ isActive, isCompleted, theme }) =>
    isActive || isCompleted ? theme.colors.primary : theme.colors.text};
  transition: color 0.3s ease;
  font-size: ${sizes.default.titleFontSize};
  line-height: 1.3;
`;

export const StepsItemDescription = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isCompleted'].includes(prop),
})<{
  isActive?: boolean;
  isCompleted?: boolean;
}>`
  font-size: ${sizes.default.descriptionFontSize};
  color: ${({ isActive, isCompleted, theme }) =>
    isActive || isCompleted ? theme.colors.primary : theme.colors.shadowLight};
  opacity: ${({ isActive, isCompleted }) => (isActive || isCompleted ? 0.8 : 0.7)};
  margin-top: 4px;
  transition: color 0.3s ease;
  line-height: 1.3;

  @media (max-width: 480px) {
    display: none;
  }
`;
