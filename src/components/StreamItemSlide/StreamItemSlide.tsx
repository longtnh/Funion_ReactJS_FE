import React from 'react'
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import Tag from '../Tag/Tag'

const LiveChannelSlide = props => {
  const bg = useColorModeValue('white', 'gray.700')
  const { data, ...extraProps } = props
  return (
    <Box {...extraProps} bg={bg}>
      <Box position="relative">
        <Image src={data.thumbnailURL} />
        <Center
          position="absolute"
          top={3}
          left={3}
          bgColor="#fc0303"
          color="white"
          px={2}
          borderRadius="md"
          fontWeight="bold"
          fontSize="sm"
        >
          LIVE
        </Center>
      </Box>
      {/* Content */}
      <Box
        py={2}
        borderWidth="1px"
        w="full"
        // display={{ md: 'none', lg: 'block', xl: 'block' }}
        display="block"
      >
        <HStack>
          <Box h="full">
            <Image
              borderRadius="full"
              src={data.imageUrl}
              boxSize={10}
              mx={2}
              align="top"
            />
          </Box>
          <Box w="full" px={3}>
            <Flex display="flex">
              <Text fontWeight="bold">{data.userName}</Text>
              <Spacer />
              <Text>{data.viewer} viewers</Text>
            </Flex>
            <Text>{data.category}</Text>
            {/* Tag */}
            <Box my={1}>
              <HStack>
                {data.tags.map((tag: Tag) => (
                  <Tag>{tag.name}</Tag>
                ))}
              </HStack>
            </Box>
          </Box>
        </HStack>
        <Text px={4}>{data.userDescription}</Text>
      </Box>
    </Box>
  )
}
export default LiveChannelSlide
