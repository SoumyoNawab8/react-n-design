import 'styled-components';
import { Theme } from '../styles/theme';

// Extend the DefaultTheme interface from styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Export props interfaces for styled components
export interface ThemeProps {
  theme: Theme;
}

export interface AlertStyledProps extends ThemeProps {
  alertType?: 'success' | 'error' | 'warning' | 'info';
}

export interface ButtonStyledProps extends ThemeProps {
  variant?: 'primary' | 'secondary';
}

export interface CardStyledProps extends ThemeProps {
  variant?: 'default' | 'inset' | 'glass';
}

export interface InputStyledProps extends ThemeProps {
  hasError?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface ProgressBarStyledProps extends ThemeProps {
  status?: 'success' | 'error' | 'warning' | 'normal';
}

export interface SelectStyledProps extends ThemeProps {
  hasError?: boolean;
}

export interface TabsStyledProps extends ThemeProps {
  type?: 'line' | 'card';
}
