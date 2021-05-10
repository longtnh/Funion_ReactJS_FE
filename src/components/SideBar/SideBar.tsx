import { toggleSideBar } from '@/App/App.actions'
import { getFollowingStreamSession, getRecommendStreamSession } from '@/App/App.thunk'
import { PATH } from '@/constants/paths'
import { COLOR } from '@/constants/styles'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { BiVideo } from 'react-icons/bi'
import { FaCircle, FaRegHeart } from 'react-icons/fa'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SideBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const bgColor = useColorModeValue(COLOR.SIDEBAR_BG, COLOR.SIDEBAR_BG_DARK)

  const isSideBarCollapsed = useSelector(
    (state: AppState) => state.app.isSideBarCollapsed,
  )
  const userId = useSelector((state: AppState) => state.app.currentUser.id)
  const followingChannels = useSelector(
    (state: AppState) => state.app.followingStreamSession,
  )
  const recommendChannels = useSelector(
    (state: AppState) => state.app.recommendStreamSession,
  )
  const followingUsers = useSelector((state: AppState) => state.app.followingUsers)

  useEffect(() => {
    dispatch(getFollowingStreamSession(userId))
    dispatch(getRecommendStreamSession())
  }, [dispatch, userId])

  const handleColBtnClicked = useCallback(() => dispatch(toggleSideBar()), [dispatch])

  const goToChannel = useCallback(
    userId => {
      history.push(`${PATH.PROFILE_VIEW}/${userId}`)
    },
    [history],
  )

  const goToStream = useCallback(
    streamSessionId => {
      history.push(`${PATH.STREAM_VIEW}/${streamSessionId}`)
    },
    [history],
  )

  return (
    <Box
      bg={bgColor}
      w={{ base: '48px', xl: isSideBarCollapsed ? '48px' : '250px' }}
      h="full"
      display={{ base: 'none', sm: 'block' }}
      style={{ transition: '0.2s' }}
    >
      <Box>
        <HStack
          px={2}
          display={{ base: 'none', xl: isSideBarCollapsed ? 'none' : 'flex' }}
        >
          {/* show Text and Btn Collapse */}
          <Text fontWeight="bold" fontSize="sm">
            FOLLOWED CHANNELS
          </Text>
          <Spacer />
          <Button
            aria-label=""
            variant="ghost"
            _focus={{}}
            colorScheme={COLOR.SIDEBAR_BG}
            fontSize="xl"
            p={0}
            rightIcon={<IoArrowBack />}
            onClick={handleColBtnClicked}
          />
        </HStack>
        {/* show Btn Expand and Icon when display in Base */}
        <Flex
          flexDirection="column"
          alignItems="center"
          display={{ base: 'flex', xl: isSideBarCollapsed ? 'flex' : 'none' }}
        >
          <IconButton
            aria-label=""
            variant="ghost"
            _focus={{}}
            colorScheme={COLOR.SIDEBAR_BG}
            fontSize="xl"
            icon={<IoArrowForward />}
            onClick={handleColBtnClicked}
            // show btn when display <= 'lg'
            display={{ base: 'none', xl: 'flex' }}
          />
          <Icon my={3} as={FaRegHeart} boxSize={4}></Icon>
        </Flex>
        {/* {followingUsers &&
          Object.entries(followingUsers as FollowingUsers).map(([key, value]) => (
            <HStack
              onClick={() =>
                followingChannels[key] === null
                  ? goToChannel(key)
                  : goToStream(followingChannels[key].id)
              }
              _hover={{ background: '#DADADA', cursor: 'pointer' }}
              py={1}
              px={2}
              key={key}
            >
              <Avatar
                size="sm"
                src={`${process.env.IDENTITY_ENDPOINT}${value.profileImage}`}
                style={{
                  filter: followingChannels[key] === null ? 'grayscale(100%)' : 'none',
                }}
              />
              <Flex
                w="full"
                display={{
                  base: 'none',
                  xl: isSideBarCollapsed ? 'none' : 'flex',
                }}
                align="center"
              >
                <Box>
                  <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                    {value.name}
                  </Text>
                  {followingChannels[key] !== null && (
                    <Text fontSize="xs" fontWeight="semibold" color="#60606f">
                      {followingChannels[key].category.name}
                    </Text>
                  )}
                </Box>
                <Spacer />
                {followingChannels[key] === null ? (
                  <Text fontSize="sm" textAlign="right">
                    Offline
                  </Text>
                ) : (
                  <Text fontSize="sm" textAlign="right">
                    <HStack display="flex">
                      <Icon as={FaCircle} color="red.500" boxSize={2}></Icon>
                      <Text>{followingChannels[key].viewCount}</Text>
                    </HStack>
                  </Text>
                )}
              </Flex>
            </HStack>
          ))} */}
        {followingUsers &&
          Object.entries(followingUsers as FollowingUsers).map(([key, value]) =>
            Object.entries(followingChannels as FollowingChannels).map(
              ([keyChannel, valueChannel]) =>
                keyChannel === key ? (
                  valueChannel === null ? (
                    <HStack
                      onClick={() => goToChannel(key)}
                      _hover={{ background: '#DADADA', cursor: 'pointer' }}
                      py={1}
                      px={2}
                      key={key}
                    >
                      <Avatar
                        size="sm"
                        src={`${process.env.IDENTITY_ENDPOINT}${value.profileImage}`}
                        style={{ filter: 'grayscale(100%)' }}
                      />
                      <Flex
                        w="full"
                        display={{
                          base: 'none',
                          xl: isSideBarCollapsed ? 'none' : 'flex',
                        }}
                        align="center"
                      >
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">
                            {value.name}
                          </Text>
                        </Box>
                        <Spacer />
                        <Text fontSize="sm" textAlign="right">
                          Offline
                        </Text>
                      </Flex>
                    </HStack>
                  ) : (
                    <HStack
                      onClick={() => goToStream(valueChannel.id)}
                      _hover={{ background: '#DADADA', cursor: 'pointer' }}
                      py={1}
                      px={2}
                      key={key}
                    >
                      <Avatar
                        size="sm"
                        src={`${process.env.IDENTITY_ENDPOINT}${value.profileImage}`}
                      />
                      <Flex
                        w="full"
                        display={{
                          base: 'none',
                          xl: isSideBarCollapsed ? 'none' : 'flex',
                        }}
                        align="center"
                      >
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">
                            {value.name}
                          </Text>
                          <Text fontSize="xs">{valueChannel.category.name}</Text>
                        </Box>
                        <Spacer />
                        <Text fontSize="sm" textAlign="right">
                          <HStack display="flex">
                            <Icon as={FaCircle} color="red.500" boxSize={2}></Icon>
                            <Text>{valueChannel.viewCount}</Text>
                          </HStack>
                        </Text>
                      </Flex>
                    </HStack>
                  )
                ) : (
                  <></>
                ),
            ),
          )}
      </Box>

      {/* Recommended */}
      <Box>
        {/* in base display -> just show icon and don't show text */}
        <Flex px={2} my={3}>
          <Icon
            ml="6px"
            boxSize={5}
            as={BiVideo}
            display={{ base: 'block', xl: isSideBarCollapsed ? 'block' : 'none' }}
          />
          <Text
            fontWeight="bold"
            fontSize="sm"
            display={{ base: 'none', xl: isSideBarCollapsed ? 'none' : 'flex' }}
          >
            RECOMMENDED CHANNELS
          </Text>
        </Flex>
        {recommendChannels &&
          recommendChannels.map((recommendData: StreamSession) => (
            <HStack
              _hover={{ background: '#DADADA', cursor: 'pointer' }}
              py={1}
              px={2}
              key={recommendData.id}
            >
              {/* in base display -> just show avatar and do not display another */}
              <Avatar size="sm" src={recommendData.streamerImageUrl} />
              <Flex
                w="full"
                display={{ base: 'none', xl: isSideBarCollapsed ? 'none' : 'flex' }}
              >
                <Box>
                  <Text fontWeight="bold" fontSize="sm">
                    {recommendData.streamerName}
                  </Text>
                  <Text fontSize="xs" fontWeight="semibold" color="#60606f">
                    {recommendData.category.name}
                  </Text>
                </Box>
                <Spacer />
                <HStack>
                  <Icon as={FaCircle} color="red.500" boxSize={2}></Icon>
                  <Text>{recommendData.viewCount}</Text>
                </HStack>
              </Flex>
            </HStack>
          ))}
      </Box>
    </Box>
  )
}
export default SideBar
