import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [ "../stories/**/*.mdx",'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Ensure React is properly configured for Storybook
    config.define = {
      ...config.define,
      global: 'globalThis',
    };
    
    // Fix React import issues
    config.esbuild = {
      ...config.esbuild,
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    };

    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;