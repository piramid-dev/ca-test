import path from 'path'
import type { StorybookConfig } from '@storybook/react-vite'
import { defineConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    'storybook-addon-remix-react-router',
    {
      name: '@storybook/addon-styling',
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config, { configType }) => {
    return defineConfig({
      ...config,
      resolve: {
        alias: {
          ...config?.resolve?.alias,
          '~': path.resolve(__dirname, '/app'),
        },
      },
    })
  },
}
export default config
