/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategory, getStreamSessionsByCategoryData } from './BrowseItem.thunk'
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaHeart, FaCircle } from 'react-icons/fa'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { COLOR } from '@/constants/styles'
import Tag from '@/components/Tag/Tag'
import StreamItem from '@/components/StreamItem/StreamItem'

const BrowseItem = () => {
  const dispatch = useDispatch()
  const { categoryId } = useParams<{ categoryId: string }>()
  const isSideBarCollapsed = useSelector(
    (state: AppState) => state.app.isSideBarCollapsed,
  )
  const categoryItem = useSelector((state: AppState) => state.browseItem.categoryItem)
  const categoryStream = useSelector((state: AppState) => state.browseItem.streams)
  const pictureFilePath = process.env.API_ENDPOINT?.concat(categoryItem.pictureFilePath)

  // Fake follow button
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(Math.floor(Math.random() * 20))
  const handleFollowBtn = useCallback(() => {
    setFollowerCount(followerCount + (isFollowing ? -1 : 1))
    setIsFollowing(!isFollowing)
  }, [dispatch, isFollowing])

  useEffect(() => {
    dispatch(getCategory(categoryId))
    dispatch(getStreamSessionsByCategoryData())
  }, [dispatch])

  return (
    <>
      {categoryItem && (
        <Box p={8} key={categoryItem.id}>
          <Flex>
            <Box w={160}>
              <Image src={pictureFilePath} />
            </Box>
            <Flex
              pl={{
                base: 4,
                md: 6,
                lg: 8,
                xl: 10,
              }}
              flex={1}
              display={{ base: 'block', md: 'flex' }}
              justify="space-between"
              align="center"
            >
              <VStack align="left">
                <Text
                  overflow="hidden !important"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  w={{ base: 200, md: 'full', lg: 'full' }}
                  fontWeight="bold"
                  fontSize="4xl"
                >
                  {categoryItem.name}
                </Text>
                <HStack>
                  <Text fontWeight="bold" fontSize="lg">
                    {followerCount} followers
                  </Text>
                  <Box pt={1}>
                    <FaCircle size={5} />
                  </Box>
                  {/* tag */}
                  <HStack mt={1} spacing={2}>
                    {categoryItem.tags &&
                      categoryItem.tags.map((tag: Tag) => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                      ))}
                  </HStack>
                </HStack>
                {/* follow button */}
                <Box pt={2}>
                  <Button
                    onClick={handleFollowBtn}
                    bg={COLOR.PRIMARY}
                    size="sm"
                    display={isFollowing ? 'none' : 'flex'}
                    _hover={{
                      cursor: 'pointer',
                      bg: '#F72B48',
                    }}
                  >
                    <Center>
                      <FaHeart size={15} color="white" />
                    </Center>
                    <Text color="white" ml={2}>
                      Follow
                    </Text>
                  </Button>
                  <Button
                    onClick={handleFollowBtn}
                    bg={COLOR.LIVE_RED}
                    size="sm"
                    display={isFollowing ? 'flex' : 'none'}
                    _hover={{
                      cursor: 'pointer',
                      bg: '#FB46CA',
                    }}
                  >
                    <Center>
                      <IoCheckmarkCircleSharp size={20} color="white" />
                    </Center>
                    <Text color="white" ml={2}>
                      Followed
                    </Text>
                  </Button>
                </Box>
              </VStack>
            </Flex>
          </Flex>
          {/* Live Channels  */}
          <Box mt={4}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              textDecoration="none"
              color={COLOR.PRIMARY}
            >
              Live Channels
            </Text>
          </Box>
          {/* live stream */}
          <SimpleGrid
            pt={1}
            columns={{
              base: 1,
              sm: 2,
              md: 3,
              lg: isSideBarCollapsed ? 4 : 3,
            }}
          >
            {categoryStream &&
              categoryStream.map((liveChannel: StreamSession) => (
                <StreamItem key={liveChannel.id} data={liveChannel} px={1} />
              ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  )
}

export default React.memo(BrowseItem)
