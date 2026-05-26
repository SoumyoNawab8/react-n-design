import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../src/styles/theme';

// Theme type for global controls
export type Theme = 'light' | 'dark';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Background colors for testing
    backgrounds: {
      default: 'neomorphic',
      values: [
        { name: 'neomorphic', value: '#e0e5ec' },
        { name: 'dark', value: '#2c2f34' },
        { name: 'white', value: '#ffffff' },
        { name: 'black', value: '#000000' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circle',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;
      return (
        <ThemeProvider theme={theme}>
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
