import React from 'react'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { COLOR } from '@/constants/styles'

interface Props {
  data: StreamSession
}

const AboutChannel = ({ data }: Props) => {
  const bgColor = useColorModeValue(COLOR.SIDEBAR_BG, COLOR.SIDEBAR_BG_DARK)

  return (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      my={5}
      h={{ base: 300, sm: 250, md: 200, lg: 200 }}
      bg={bgColor}
      align="center"
    >
      <Box px={3} w="20%" align="center">
        <Avatar mt={2} size="xl" src={data.streamerImageUrl} />
        <Text fontSize="sm" fontWeight="bold" mt={2}>
          {data.followers} followers
        </Text>
      </Box>
      <Flex
        flex={1}
        display={{ base: 'block', md: 'flex' }}
        justify="space-between"
        align="center"
        pr={8}
      >
        <VStack align="left">
          <Text fontWeight="bold" fontSize="lg">
            Announcement
          </Text>
          <Text>{data.announcement}</Text>
        </VStack>
        <VStack align="left" mt={{ base: 5, md: 0 }}>
          <HStack>
            <FaTwitter />
            <Text>Twitter</Text>
          </HStack>
          <HStack>
            <FaInstagram />
            <Text>Instagram</Text>
          </HStack>
          <HStack>
            <FaYoutube />
            <Text>Youtube</Text>
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  )
}
export default React.memo(AboutChannel)
