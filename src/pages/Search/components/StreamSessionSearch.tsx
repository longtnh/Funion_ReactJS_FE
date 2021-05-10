import React, { useCallback } from 'react'
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  Flex,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import Tag from '../../../components/Tag/Tag'
import { PATH } from '@/constants/paths'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import { COLOR } from '@/constants/styles'

const StreamSessionSearch = props => {
  const { data } = props
  const history = useHistory()
  const bg = useColorModeValue('white', '#1a202c')

  const goToStreamSession = useCallback(() => {
    if (data.id.length === 1) return
    history.push(`${PATH.STREAM_VIEW}/${data.id}`)
  }, [data.id, history])

  return (
    <Box bg={bg} w={{ base: 72, md: 72, lg: '310px' }} px={1}>
      <Box position="relative">
        <Box
          my={3}
          _hover={{
            boxShadow: '-4px 5px #FB46CA',
            cursor: 'pointer',
            transition: '0.2s',
            mt: 2,
            mb: 4,
          }}
          onClick={goToStreamSession}
        >
          <Image src={data.thumbnailImage} />
          <Center
            position="absolute"
            top={2}
            left={2}
            px={2}
            bgColor="#fc0303"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            borderRadius="md"
          >
            LIVE
          </Center>
          <Center
            position="absolute"
            px={1}
            bottom={2}
            left={2}
            color="white"
            bg="rgba(0,0,0, 0.5)"
            fontSize="xs"
            fontWeight="bold"
            borderRadius="md"
          >
            <Text>{data.viewCount} viewers</Text>
          </Center>
        </Box>
      </Box>
      <Flex py={2} w="full">
        <HStack>
          <Box h="full">
            <Image
              borderRadius="full"
              src={data.streamerImageUrl}
              boxSize={9}
              mx={1}
              align="top"
            />
          </Box>
          <Box w="full" fontSize="sm">
            <Text
              overflow="hidden !important"
              textOverflow="ellipsis"
              _hover={{ color: '#FB46CA', cursor: 'pointer' }}
              whiteSpace="nowrap"
              w={{ base: '14rem', md: '225px', lg: '250px' }}
              fontWeight="bold"
              onClick={goToStreamSession}
            >
              {data.title}
            </Text>
            <Text>
              <Link
                as={ReactLink}
                fontWeight="semibold"
                to={
                  data.id.length < 5
                    ? ''
                    : `${PATH.PROFILE_VIEW}/${data.streamerIdentityGuid}`
                }
                color={COLOR.BLUE_TEXT}
                _hover={{ color: COLOR.PRIMARY }}
              >
                {data.streamerName}
              </Link>
            </Text>
            {/* Tag */}
            <Box my={1}>
              <Box display="flex" flexWrap="wrap" py={1}>
                {data.tags.map((tag: Tag) => (
                  <Tag key={tag.id} mr={1} mb={1}>
                    {tag.name}
                  </Tag>
                ))}
              </Box>
            </Box>
          </Box>
        </HStack>
      </Flex>
    </Box>
  )
}
export default React.memo(StreamSessionSearch)
