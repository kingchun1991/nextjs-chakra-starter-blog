import { createSystem, defaultConfig, defineTokens } from '@chakra-ui/react';

const tokens = defineTokens({
  fonts: {
    heading: { value: 'var(--font-body), helvetica, arial, sans-serif' },
    body: { value: 'var(--font-body), helvetica, arial, sans-serif' },
  },
});

export const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens,
    semanticTokens: {
      colors: {
        // Brand — GOV.UK blue scale
        'brand.solid': { value: { base: '#1d70b8', _dark: '#5694ca' } },
        'brand.muted': { value: { base: '#5694ca', _dark: '#8eb8dc' } },
        'brand.subtle': { value: { base: '#d2e2f1', _dark: '#1e3a5f' } },
        // Foreground
        'fg.default': { value: { base: '#0b0c0c', _dark: '#f3f2f1' } },
        'fg.muted': { value: { base: '#505a5f', _dark: '#9ca3af' } },
        // Background
        'bg.default': { value: { base: '#ffffff', _dark: '#111827' } },
        'bg.surface': { value: { base: '#f3f2f1', _dark: '#1f2937' } },
        // Border
        'border.default': { value: { base: '#b1b4b6', _dark: '#374151' } },
        // State
        'state.error': { value: { base: '#d4351c', _dark: '#f87171' } },
        'state.success': { value: { base: '#00703c', _dark: '#34d399' } },
        'state.focus': { value: '#ffdd00' },
      },
    },
  },
});
