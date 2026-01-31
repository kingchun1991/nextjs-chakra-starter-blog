'use client';

import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

interface ProductSimpleProps {
  imgsrc: string;
  title: string;
  price: string;
  url: string;
}

export function ProductSimple(props: ProductSimpleProps) {
  const data = props;

  return (
    <Center py={12}>
      <Box
        _dark={{ bg: 'gray.800' }}
        bg="white"
        boxShadow="2xl"
        maxW="330px"
        p={6}
        pos="relative"
        role="group"
        rounded="lg"
        w="full"
        zIndex={1}
      >
        <Box
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
          height="230px"
          mt={-12}
          pos="relative"
          rounded="lg"
        >
          <Image
            height={230}
            objectFit="cover"
            rounded="lg"
            src={data.imgsrc}
            width={282}
          />
        </Box>
        <Stack align="center" pt={10}>
          <Heading fontFamily="body" fontSize="2xl" fontWeight={500}>
            {data.title}
          </Heading>
          <Stack align="center" direction="row">
            <Button
              border="2px"
              borderColor="dark.500"
              onClick={() => window.open(data.url, '_blank')}
              size="md"
            >
              <Text fontSize="xl" fontWeight={800}>
                {data.price} from Amazon
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
