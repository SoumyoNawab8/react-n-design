'use client';
import styled, { css } from 'styled-components';

// ============================================
// Form Container Styles
// ============================================

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  box-sizing: border-box;
`;

// ============================================
// Form Item Wrapper Styles
// ============================================

export interface FormItemWrapperProps {
  $layout: 'horizontal' | 'vertical' | 'inline';
  $validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
}

export const FormItemWrapper = styled.div<FormItemWrapperProps>`
  display: flex;
  margin-bottom: 24px;
  box-sizing: border-box;
  transition: all 0.3s ease;

  ${({ $layout }) => {
    switch ($layout) {
      case 'horizontal':
        return css`
          flex-direction: row;
          align-items: flex-start;
        `;
      case 'vertical':
        return css`
          flex-direction: column;
          gap: 8px;
        `;
      case 'inline':
        return css`
          flex-direction: row;
          align-items: center;
          margin-right: 24px;
          margin-bottom: 0;
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
  $layout: 'horizontal' | 'vertical' | 'inline';
  $labelAlign: 'left' | 'right';
  $labelCol?: { span?: number; offset?: number };
}

export const FormItemLabel = styled.label<FormItemLabelProps>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 20px;
  white-space: nowrap;
  text-align: ${({ $labelAlign }) => $labelAlign};

  ${({ $layout, $labelCol, $labelAlign }) => {
    if ($layout === 'horizontal') {
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
      return css`
        margin-right: 8px;
        padding-top: 4px;
      `;
    }
    return css`
      width: 100%;
    `;
  }}
`;

// ============================================
// Form Control Styles
// ============================================

export interface FormItemControlProps {
  $layout: 'horizontal' | 'vertical' | 'inline';
  $wrapperCol?: { span?: number; offset?: number };
}

export const FormItemControl = styled.div<FormItemControlProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  ${({ $layout, $wrapperCol }) => {
    if ($layout === 'horizontal' && $wrapperCol) {
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

export const FormItemHelp = styled.div<{ $status?: '' | 'success' | 'warning' | 'error' | 'validating' }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 4px;
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
`;

// ============================================
// Error/Help Text Styles
// ============================================

export const ErrorText = styled.div<{ $layout?: 'horizontal' | 'vertical' }>`
  font-size: 12px;
  color: #e53e3e;
  margin: 4px 0 0 0;
`;

export const ErrorMessage = styled.div<{ $layout?: 'horizontal' | 'vertical' }>`
  font-size: 12px;
  color: #e53e3e;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ============================================
// Extra Content Styles
// ============================================

export const FormItemExtra = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.shadowDark};
  line-height: 1.5;
`;

// ============================================
// Required Mark
// ============================================

export const RequiredMark = styled.span`
  display: inline-block;
  margin-left: 4px;
  color: #e53e3e;
  font-weight: bold;
`;

// ============================================
// Validation Icon
// ============================================

export const ValidationIcon = styled.span<{ $status: string }>`
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 16px;
  color: ${({ $status }) => {
    switch ($status) {
      case 'error':
        return '#e53e3e';
      case 'success':
        return '#38a169';
      case 'warning':
        return '#dd6b20';
      default:
        return 'inherit';
    }
  }};
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
    color: #e53e3e;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
