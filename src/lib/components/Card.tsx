'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';

export default function ProductSimple(props: any) {
  const data = props;

  return (
    <Center py={12}>
      <Box
        role="group"
        p={6}
        maxW="330px"
        w="full"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="lg"
          mt={-12}
          pos="relative"
          height="230px"
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${data.imgsrc})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded="lg"
            height={230}
            width={282}
            objectFit="cover"
            src={data.imgsrc}
          />
        </Box>
        <Stack pt={10} align="center">
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {data.title}
          </Heading>
          <Stack direction="row" align="center">
            <Button
              size="md"
              border="2px"
              borderColor="dark.500"
              onClick={() => window.open(data.url, '_blank')}
            >
              <Text fontWeight={800} fontSize="xl">
                {data.price} from Amazon
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
