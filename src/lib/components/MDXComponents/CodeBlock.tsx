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

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  const language = className?.replace(/language-/, '') || 'typescript';
  const codeString = children.props.children.toString().trim();
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
        theme={themes.nightOwl}
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
