/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-shadow */
import { Box } from '@chakra-ui/react';
import { Highlight, themes } from 'prism-react-renderer';
import type React from 'react';

// import { FiCopy } from 'react-icons/fi';

// import { Tooltip } from '@/components/ui/tooltip';

interface CodeBlockProps {
  children: React.ReactElement;
  className?: string;
}

const LANGUAGE_PREFIX_REGEX = /language-/;

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  const language =
    className?.replace(LANGUAGE_PREFIX_REGEX, '') || 'typescript';
  const codeString = (children.props as { children: string }).children
    .toString()
    .trim();
  // const { hasCopied, onCopy } = useClipboard(codeString);

  return (
    <Box position="relative" width="100%">
      {/* <Tooltip label={hasCopied ? 'Copied!' : 'Copy code'} placement="top">
        <IconButton
          aria-label="Copy code"
          size="sm"
          position="absolute"
          top="0"
          right="0"
          onClick={onCopy}
        >
          <FiCopy />
        </IconButton>
      </Tooltip> */}
      <Highlight
        // theme={colorMode === 'light' ? themes.nightOwlLight : themes.nightOwl}
        code={codeString}
        language={language}
        theme={themes.nightOwl}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, overflowX: 'auto' }}>
            {tokens.map((line, i) => (
              <Box key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </Box>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  );
};
