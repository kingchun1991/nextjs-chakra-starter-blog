/* eslint-disable import/prefer-default-export */

'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ColorModeProviderProps } from './color-mode';
import { ColorModeProvider } from './color-mode';
import { EmotionRegistry } from './emotion-registry';

import {customTheme} from '@/lib/styles/theme';

export function Provider(props: ColorModeProviderProps) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </EmotionRegistry>
  );
}
