import React from 'react'
import { Box, HStack, Image, Text, Flex, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '@/constants/paths'

const UserSearch = props => {
  const { data, ...extraPros } = props
  return (
    <Box>
      <Flex {...extraPros} py={4}>
        <HStack>
          <Box h="full">
            <Image
              borderRadius="full"
              src={`${process.env.IDENTITY_ENDPOINT}${data.profileImage}`}
              boxSize={{ base: 16, md: 24, lg: 28 }}
              mx={1}
              align="top"
            />
          </Box>
          <Box px={5} w={{ base: 'full', md: '38rem', lg: '42rem' }}>
            <Link
              as={ReactLink}
              fontSize="lg"
              fontWeight="bold"
              _hover={{ color: '#FB46CA', cursor: 'pointer' }}
              to={`${PATH.PROFILE_VIEW}/${data.id}`}
            >
              {data.name}
            </Link>
            <Text fontSize="sm">{data.followedCount} Followers</Text>
            <Text fontSize="sm" pt={2}>
              {data.biography}
            </Text>
          </Box>
        </HStack>
      </Flex>
    </Box>
  )
}

export default React.memo(UserSearch)
