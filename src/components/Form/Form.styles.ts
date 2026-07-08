'use client';
import styled, { css, keyframes } from 'styled-components';
import { iconColor } from '../../styles/iconColor';

// ============================================
// Animation Keyframes
// ============================================

export const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
`;

export const errorMessageReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 100px;
  }
`;

export const checkmarkDraw = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ============================================
// Form Container Styles
// ============================================

export interface StyledFormProps {
  $compact?: boolean;
}

export const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  padding: ${({ $compact }) => ($compact ? '16px' : '24px')};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  box-sizing: border-box;

  /* Size variants */
  &[data-size="small"] {
    padding: 16px;
  }
  &[data-size="large"] {
    padding: 32px;
  }
  &[data-compact="true"] {
    padding: 16px;
  }
`;

// ============================================
// Form Item Wrapper Styles
// ============================================

export interface FormItemWrapperProps {
  $layout: 'horizontal' | 'vertical' | 'inline' | 'compact';
  $validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  $shake?: boolean;
  $isMobile?: boolean;
}

export const FormItemWrapper = styled.div<FormItemWrapperProps>`
  display: flex;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '20px' : '24px')};
  box-sizing: border-box;
  transition: all 0.3s ease;

  /* Shake animation on error */
  ${({ $shake, $validateStatus }) =>
    $shake && $validateStatus === 'error'
      ? css`
          animation: ${shakeAnimation} 0.4s ease-in-out;
        `
      : ''}

  ${({ $layout, $isMobile }) => {
    switch ($layout) {
      case 'horizontal':
        // Mobile breakpoint - switch to vertical
        if ($isMobile) {
          return css`
            flex-direction: column;
            gap: 6px;
          `;
        }
        return css`
          flex-direction: row;
          align-items: flex-start;
        `;
      case 'vertical':
        return css`
          flex-direction: column;
          gap: ${$isMobile ? '6px' : '8px'};
        `;
      case 'inline':
        if ($isMobile) {
          return css`
            flex-direction: column;
            gap: 4px;
            margin-right: 0;
            margin-bottom: ${$isMobile ? '16px' : '0'};
          `;
        }
        return css`
          flex-direction: row;
          align-items: center;
          margin-right: 24px;
          margin-bottom: 0;
        `;
      case 'compact':
        return css`
          flex-direction: column;
          gap: 4px;
          margin-bottom: ${$isMobile ? '16px' : '20px'};
        `;
      default:
        return '';
    }
  }}

  &:last-child {
    margin-bottom: 0;
  }
`;

// ============================================
// Form Label Styles
// ============================================

export interface FormItemLabelProps {
  $layout: 'horizontal' | 'vertical' | 'inline' | 'compact';
  $labelAlign: 'left' | 'right';
  $labelCol?: { span?: number; offset?: number };
  $isMobile?: boolean;
  $compact?: boolean;
}

export const FormItemLabel = styled.label<FormItemLabelProps>`
  display: flex;
  align-items: center;
  font-size: ${({ $compact }) => ($compact ? '13px' : '14px')};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ $compact }) => ($compact ? '18px' : '20px')};
  white-space: ${({ $isMobile }) => ($isMobile ? 'normal' : 'nowrap')};
  text-align: ${({ $labelAlign }) => $labelAlign};

  ${({ $layout, $labelCol, $labelAlign, $isMobile, $compact }) => {
    if ($layout === 'horizontal') {
      // Mobile responsive - full width
      if ($isMobile) {
        return css`
          width: 100%;
          margin-left: 0;
          padding-right: 0;
          padding-top: 0;
          flex-shrink: 0;
          justify-content: flex-start;
          font-size: 13px;
        `;
      }
      const span = $labelCol?.span || 6;
      const offset = $labelCol?.offset || 0;
      return css`
        width: ${(span / 24) * 100}%;
        margin-left: ${(offset / 24) * 100}%;
        padding-right: 16px;
        padding-top: 8px;
        flex-shrink: 0;
        justify-content: ${$labelAlign === 'left' ? 'flex-start' : 'flex-end'};
      `;
    }
    if ($layout === 'inline') {
      if ($isMobile) {
        return css`
          margin-right: 0;
          padding-top: 0;
          font-size: 13px;
        `;
      }
      return css`
        margin-right: 8px;
        padding-top: 4px;
      `;
    }
    if ($layout === 'compact') {
      return css`
        width: 100%;
        font-size: 12px;
        color: ${({ theme }: { theme: { colors: { shadowDark: string } } }) => theme.colors.shadowDark};
      `;
    }
    return css`
      width: 100%;
    `;
  }}

  @media (max-width: 768px) {
    font-size: 13px;
    white-space: normal;
  }
`;

// ============================================
// Form Control Styles
// ============================================

export interface FormItemControlProps {
  $layout: 'horizontal' | 'vertical' | 'inline' | 'compact';
  $wrapperCol?: { span?: number; offset?: number };
  $isMobile?: boolean;
}

export const FormItemControl = styled.div<FormItemControlProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  ${({ $layout, $wrapperCol, $isMobile }) => {
    if ($layout === 'horizontal' && $wrapperCol && !$isMobile) {
      const span = $wrapperCol.span || 18;
      const offset = $wrapperCol.offset || 0;
      return css`
        width: ${(span / 24) * 100}%;
        margin-left: ${(offset / 24) * 100}%;
      `;
    }
    return css`
      width: 100%;
    `;
  }}
`;

export const FormFieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// ============================================
// Inline Layout Helper
// ============================================

export const FormItemHelp = styled.div<{
  $status?: '' | 'success' | 'warning' | 'error' | 'validating';
  $isMobile?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  font-size: ${({ $isMobile }) => ($isMobile ? '11px' : '12px')};
  line-height: 1.5;
  margin-top: ${({ $isMobile }) => ($isMobile ? '2px' : '4px')};
  color: ${({ $status }) => {
    switch ($status) {
      case 'success':
        return '#38a169';
      case 'warning':
        return '#dd6b20';
      case 'error':
        return '#e53e3e';
      default:
        return '#718096';
    }
  }};
  animation: ${errorMessageReveal} 0.3s ease-out;
`;

// ============================================
// Error/Help Text Styles
// ============================================

export const ErrorText = styled.div<{ $layout?: 'horizontal' | 'vertical' | 'compact' }>`
  font-size: 12px;
  color: #e53e3e;
  margin: 4px 0 0 0;
  animation: ${errorMessageReveal} 0.3s ease-out;
`;

export const ErrorMessage = styled.div<{ $layout?: 'horizontal' | 'vertical' | 'compact' }>`
  font-size: 12px;
  color: #e53e3e;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  animation: ${errorMessageReveal} 0.3s ease-out;
`;

// ============================================
// Extra Content Styles
// ============================================

export const FormItemExtra = styled.div<{ $isMobile?: boolean }>`
  margin-top: ${({ $isMobile }) => ($isMobile ? '2px' : '4px')};
  font-size: ${({ $isMobile }) => ($isMobile ? '11px' : '12px')};
  color: ${({ theme }) => theme.colors.shadowDark};
  line-height: 1.5;
`;

// ============================================
// Required Mark
// ============================================

export const RequiredMark = styled.span`
  display: inline-block;
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
`;

// ============================================
// Validation Icon
// ============================================

export const ValidationIcon = styled.span<{
  $status: string;
  $shake?: boolean;
  $compact?: boolean;
}>`
  display: flex;
  align-items: center;
  margin-left: ${({ $compact }) => ($compact ? '6px' : '8px')};
  font-size: ${({ $compact }) => ($compact ? '14px' : '16px')};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return '#dd6b20';
      default:
        return 'inherit';
    }
  }};
  ${iconColor}

  /* Success checkmark animation */
  ${({ $status }) =>
    $status === 'success'
      ? css`
          svg {
            animation: ${checkmarkDraw} 0.3s ease-out;
          }
        `
      : ''}

  ${({ $status, $shake }) =>
    $status === 'error' && $shake
      ? css`
          animation: ${shakeAnimation} 0.4s ease-in-out;
        `
      : ''}
`;

// ============================================
// Inline Layout Helper
// ============================================

export const FormInlineWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  & > * {
    margin-right: 16px;
    margin-bottom: 8px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > * {
      margin-right: 0;
      width: 100%;
    }
  }
`;

// ============================================
// Helper for FormField (backward compatibility)
// ============================================

export const LegacyFormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  position: relative;

  & > *:last-child {
    margin-bottom: 0;
  }

  .form-field-error {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
    animation: ${errorMessageReveal} 0.3s ease-out;
  }
`;

// ============================================
// Validation Tooltip (Touch-friendly)
// ============================================

export const ValidationTooltip = styled.div<{
  $status: 'error' | 'success' | 'warning';
  $isMobile?: boolean;
}>`
  position: absolute;
  ${({ $isMobile }) => ($isMobile ? 'bottom: 100%' : 'right: 100%')}
  ${({ $isMobile }) =>
    $isMobile ? 'left: 0; right: 0; margin-bottom: 8px;' : 'top: 50%; transform: translateY(-50%); margin-right: 8px;'}
  background: ${({ $status }) => {
    switch ($status) {
      case 'error':
        return '#e53e3e';
      case 'success':
        return '#38a169';
      case 'warning':
        return '#dd6b20';
    }
  }};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ $isMobile }) => ($isMobile ? '8px 12px' : '6px 10px')};
  border-radius: 6px;
  font-size: ${({ $isMobile }) => ($isMobile ? '13px' : '12px')};
  white-space: normal;
  max-width: ${({ $isMobile }) => ($isMobile ? '100%' : '200px')};
  z-index: 10;
  animation: ${fadeInSlide} 0.2s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-height: ${({ $isMobile }) => ($isMobile ? '44px' : 'auto')};
  display: flex;
  align-items: center;

  /* Arrow for tooltip */
  &::after {
    content: '';
    position: absolute;
    ${({ $isMobile }) => ($isMobile ? 'top: 100%; left: 20px;' : 'right: -6px; top: 50%; transform: translateY(-50%);')}
    border-width: ${({ $isMobile }) => ($isMobile ? '6px 6px 0' : '6px 0 6px 6px')};
    border-style: solid;
    border-color: ${({ $status, $isMobile }) => {
      const bg =
        $status === 'error' ? '#e53e3e' : $status === 'success' ? '#38a169' : '#dd6b20';
      return $isMobile ? `${bg} transparent transparent` : `transparent transparent transparent ${bg}`;
    }};
  }

  @media (max-width: 768px) {
    position: static;
    margin-top: 6px;
    margin-right: 0;
    transform: none;
    width: 100%;
    min-height: 44px;

    &::after {
      display: none;
    }
  }
`;

// Success state highlight for input wrapper
export const SuccessHighlight = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid #38a169;
  border-radius: 8px;
  pointer-events: none;
  animation: ${checkmarkDraw} 0.3s ease-out;
`;
