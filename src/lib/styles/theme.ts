import { createSystem, defaultConfig, defineTokens } from '@chakra-ui/react';

const tokens = defineTokens({
  fonts: {
    heading: { value: 'var(--font-body)' },
    body: { value: 'var(--font-body)' },
  },
});

const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens,
  },
});

export default customTheme;
