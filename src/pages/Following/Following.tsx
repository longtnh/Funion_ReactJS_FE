import StreamItem from '@/components/StreamItem/StreamItem'
import { COLOR } from '@/constants/styles'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStreamSessionsFollowingData } from '../Following/following.thunk'

const Following = () => {
  const dispatch = useDispatch()
  const streamSessions = useSelector((state: AppState) => state.following.streamSessions)

  useEffect(() => {
    dispatch(getStreamSessionsFollowingData())
  }, [dispatch])
  return (
    <>
      <Box p={8}>
        <Text fontSize="5xl" fontWeight="bold">
          Following
        </Text>
        <Box mt={2}>
          <Text fontSize="2xl" fontWeight="bold" color={COLOR.PRIMARY}>
            Live Channels
          </Text>
        </Box>
        {/* live channels */}
        <Flex overflowX="auto">
          <HStack>
            {streamSessions &&
              streamSessions.map((streamSession: StreamSession) => (
                <StreamItem key={streamSession.id} data={streamSession} px={1} />
              ))}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}
export default Following
