/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { COLOR } from '@/constants/styles'
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi'
import { FaHeart } from 'react-icons/fa'
import { RiErrorWarningFill } from 'react-icons/ri'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import {
  followUser,
  getInfoById,
  getMostPlayGames,
  unFollowUser,
} from './profileView.thunk'
import { useParams } from 'react-router'

const ProfileView = () => {
  const { userId } = useParams<{ userId: string }>()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: AppState) => state.app.currentUser)
  const userProfile = useSelector((state: AppState) => state.profileView.profile)
  const mostPlayGames = useSelector((state: AppState) => state.profileView.mostPlayGames)
  const isFollowing = useSelector((state: AppState) => state.profileView.isFollowing)
  const handleFollowBtn = useCallback(
    () => dispatch(followUser(currentUser.sub, userId)),
    [dispatch],
  )
  const handleUnFollowBtn = useCallback(
    () => dispatch(unFollowUser(currentUser.sub, userId)),
    [dispatch],
  )
  const profileImageFilePath = `${process.env.IDENTITY_ENDPOINT}${userProfile.profileImage}`
  const bannerImageFilePath = `${process.env.IDENTITY_ENDPOINT}${userProfile.bannerImage}`

  useEffect(() => {
    dispatch(getInfoById(userId))
    dispatch(getMostPlayGames())
  }, [dispatch])

  return (
    <>
      {userProfile && (
        <Box>
          <Image
            src={bannerImageFilePath}
            w="full"
            h={{ base: 200, md: 250 }}
            objectFit="cover"
          ></Image>

          <Box w="full" h={{ base: 48, md: 24 }}>
            <Box
              display={{ base: 'block', md: 'flex' }}
              position="relative"
              p={4}
              top={-20}
            >
              <Center flexShrink={0} textAlign={{ base: 'center', md: 'unset' }}>
                <Avatar size="2xl" src={profileImageFilePath} />
              </Center>
              <Flex
                ml={{ md: 6 }}
                mt={{ base: 5, md: 0 }}
                flexDirection="column"
                justify="center"
              >
                <HStack
                  alignSelf={{ base: 'center', md: 'start' }}
                  flexDirection={{ base: 'row' }}
                  mt={{ md: 4 }}
                  spacing={2}
                >
                  <Text fontSize="2xl" fontWeight="bold" ml="auto">
                    {userProfile.name}
                  </Text>
                  {userProfile.gender === 1 ? (
                    <BiMaleSign size={29} color={COLOR.DIAMOND} />
                  ) : userProfile.gender === 2 ? (
                    <BiFemaleSign size={29} color={COLOR.PRIMARY} />
                  ) : (
                    <RiErrorWarningFill size={29} color={COLOR.DIAMOND} />
                  )}
                  {/* following button */}
                  <Button
                    w={28}
                    onClick={isFollowing ? handleUnFollowBtn : handleFollowBtn}
                    bg={isFollowing ? COLOR.LIVE_RED : COLOR.PRIMARY}
                    size="sm"
                    _hover={{
                      cursor: 'pointer',
                      bg: isFollowing ? '#FB46CA' : '#F72B48',
                    }}
                  >
                    <Center mr={1}>
                      {isFollowing ? (
                        <IoCheckmarkCircleSharp size={20} color="white" />
                      ) : (
                        <FaHeart size={15} color="white" />
                      )}
                    </Center>
                    <Text color="white">{isFollowing ? 'Followed' : 'Follow'}</Text>
                  </Button>
                </HStack>
                <HStack
                  spacing={{ base: 2, md: 5 }}
                  mt={{ base: 4, md: 5 }}
                  alignSelf={{ base: 'center', md: 'start' }}
                  fontWeight="semibold"
                  fontSize={17}
                >
                  <Flex direction="column" align="center">
                    <Text color="gray.500">Following</Text>
                    <Text>{userProfile.followingCount}</Text>
                  </Flex>
                  <Divider orientation="vertical" />
                  <Flex direction="column" align="center">
                    <Divider orientation="vertical" />
                    <Text color="gray.500">Follower</Text>
                    <Text>{userProfile.followedCount}</Text>
                  </Flex>
                </HStack>
              </Flex>
            </Box>
          </Box>
          <Text
            ml={{ base: 'auto', md: 168 }}
            mt={{ base: 4, md: -19 }}
            align={{ base: 'center', md: 'start' }}
            fontSize={17}
            fontWeight="semibold"
            color="gray.500"
          >
            Stream Frequency
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 2, md: 5 }}
            mt={2}
            ml={{ md: 168 }}
            align={{ base: 'center', md: 'start' }}
          >
            {mostPlayGames &&
              mostPlayGames.map((game: Game, index) => (
                <HStack key={index} align="center">
                  <Avatar size="sm" src={game.image} />
                  <Text size="sm" fontWeight="semibold">
                    {game.name}
                  </Text>
                </HStack>
              ))}
          </Stack>
        </Box>
      )}
    </>
  )
}

export default ProfileView
