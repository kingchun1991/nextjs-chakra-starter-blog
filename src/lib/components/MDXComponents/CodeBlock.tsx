/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  useColorMode,
  IconButton,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react';
import { Highlight, themes } from 'prism-react-renderer';
import type React from 'react';
import { FiCopy } from 'react-icons/fi';

interface CodeBlockProps {
  children: React.ReactElement;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  const language = className?.replace(/language-/, '') || 'typescript';
  const codeString = children.props.children.toString().trim();
  const { colorMode } = useColorMode();
  const { hasCopied, onCopy } = useClipboard(codeString);

  return (
    <Box position="relative" width="100%">
      <Tooltip label={hasCopied ? 'Copied!' : 'Copy code'} placement="top">
        <IconButton
          aria-label="Copy code"
          icon={<FiCopy />}
          size="sm"
          position="absolute"
          top="0"
          right="0"
          onClick={onCopy}
        />
      </Tooltip>
      <Highlight
        theme={colorMode === 'light' ? themes.nightOwlLight : themes.nightOwl}
        code={codeString}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, overflowX: 'auto' }}>
            {tokens.map((line, i) => (
              <Box {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </Box>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  );
};
