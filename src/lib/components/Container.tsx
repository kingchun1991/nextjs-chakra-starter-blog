import { useColorMode, Flex } from '@chakra-ui/react';

const Container = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();
  // const mobile = useBreakpointValue({ md: true });

  const bgColor = {
    light: 'white',
    dark: 'dark.500',
  };

  const color = {
    light: 'black',
    dark: 'white',
  };

  return (
    <Flex
      as="main"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      px={[2, 4, 4]}
      mt={[4, 8, 8]}
    >
      {children}
    </Flex>
  );
};

export default Container;
