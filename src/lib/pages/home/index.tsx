import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

import CTASection from '~/lib/components/samples/CTASection';
import SomeImage from '~/lib/components/samples/SomeImage';
import SomeText from '~/lib/components/samples/SomeText';

const Home = () => {
  return (
    <Box>
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        Latest
      </Heading>
      <Text fontSize="s">A blog created with Next.js and Chakra UI</Text>
      <SomeImage />
      <Divider />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <SomeText />

        <CTASection />
      </Flex>
    </Box>
  );
};

export default Home;
