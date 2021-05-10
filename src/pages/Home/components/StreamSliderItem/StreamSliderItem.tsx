import React, { useCallback } from 'react'
import {
  Box,
  Center,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as ReactLink, useHistory, useRouteMatch } from 'react-router-dom'
import Tag from '@/components/Tag/Tag'
import { COLOR } from '@/constants/styles'
import { PATH } from '@/constants/paths'

interface Props {
  key: number
  data: StreamSession
}

const StreamSliderItem = ({ data, ...extraProps }: Props) => {
  const bg = useColorModeValue('#f7f7f8', 'gray.700')
  const history = useHistory()
  let { url } = useRouteMatch()
  url = url.replace(/\/$/, '')

  const goToStreamSession = useCallback(() => {
    if (data.id.length < 5) return
    history.push(`${PATH.STREAM_VIEW}/${data.id}`)
  }, [data.id, history])

  return (
    <Box {...extraProps} display={{ base: 'none', sm: 'flex', md: 'flex' }} w="full">
      <Box position="relative" onClick={goToStreamSession}>
        <Box minW={{ xl: '500px', lg: '420px', md: '350px' }}>
          <Image src={data && data.thumbnailImage} />
        </Box>
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
      {data && (
        <Box
          py={2}
          borderWidth="1px"
          minW={{ xl: '210px', lg: '160px', md: '150px' }}
          fontSize="sm"
          display={{ base: 'none', xl: 'block' }}
          bgColor={bg}
        >
          <HStack>
            <Box h="full">
              <Image
                borderRadius="full"
                src={data.streamerImageUrl}
                boxSize={10}
                ml={4}
                align="top"
              />
            </Box>
            <Box>
              <Text>
                <Link
                  as={ReactLink}
                  fontWeight="semibold"
                  to={
                    data.id.length < 5
                      ? ''
                      : `${url}${PATH.PROFILE_VIEW}/${data.streamerIdentityGuid}`
                  }
                  color={COLOR.BLUE_TEXT}
                  _hover={{ color: COLOR.PRIMARY }}
                >
                  {data.streamerName}
                </Link>
              </Text>
              <Text>
                <Link
                  as={ReactLink}
                  fontWeight="medium"
                  to={
                    data.id.length < 5 ? '' : `${url}${PATH.BROWSE}/${data.category.id}`
                  }
                  color={COLOR.GRAY_TEXT}
                  _hover={{ color: COLOR.PRIMARY }}
                >
                  {data.category.name}
                </Link>
              </Text>
              <Text>{data.viewCount} viewers</Text>
            </Box>
          </HStack>
          {/* Tag */}
          <Box my={1} px={4}>
            <Box display="flex" flexWrap="wrap" py={1}>
              {data.tags.map((tag: Tag) => (
                <Tag key={tag.id} mr={2} mb={1}>
                  {tag.name}
                </Tag>
              ))}
            </Box>
            <Text noOfLines={6}>{data.announcement}</Text>
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default React.memo(StreamSliderItem)
