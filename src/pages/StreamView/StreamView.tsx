import Chat from '@/components/Chat/Chat'
import { useStreamHub } from '@/hooks/StreamHubHooks'
import { toggleChatBox } from '@/pages/StreamView/streamView.actions'
import { Box, Flex, IconButton, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import AboutChannel from './components/AboutChannel'
import StreamViewerItem from './components/StreamViewItem'
import { getStreamById } from './streamView.thunk'
import StreamPlayer from '@/components/StreamPlayer/StreamPlayer'
import { donateUser } from './streamView.thunk'

const StreamView = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { streamSessionId } = useParams<{ streamSessionId: string }>()
  const streamSession = useSelector((state: AppState) => state.streamView.streamSession)

  const { chatMessages, viewCount, sendChatMessage } = useStreamHub(streamSessionId)

  const isChatBoxCollapsed = useSelector(
    (state: AppState) => state.streamView.isChatBoxCollapsed,
  )
  const handleColBtnClicked = useCallback(() => dispatch(toggleChatBox()), [dispatch])

  useEffect(() => {
    dispatch(getStreamById(streamSessionId))
  }, [dispatch, streamSessionId])

  const onDonate = (
    amount: number,
    receiverId: string,
    streamId: string,
    username: string,
    message: string,
    balance: number,
  ) => {
    if (balance < amount) {
      toast({
        description: 'Your balance not enough to donate !',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    } else {
      dispatch(donateUser(amount, receiverId, streamId, username, message))
      toast({
        description: 'Donate success !',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      w="full"
      h="full"
      display={{ base: 'block', lg: 'flex' }}
      overflowY={{ base: 'auto', lg: 'inherit' }}
    >
      {/* live video */}
      <Box overflowY="auto" flex={1}>
        <Box position="relative">
          {streamSession && <StreamPlayer streamSession={streamSession} />}

          <IconButton
            position="absolute"
            aria-label=""
            variant="ghost"
            colorScheme="white"
            color="white"
            fontSize="xl"
            top={1}
            right={2}
            icon={<IoArrowBack />}
            onClick={handleColBtnClicked}
            display={isChatBoxCollapsed ? 'flex' : 'none'}
          />
        </Box>

        <Box px={4}>
          {streamSession && (
            <>
              {/* channel info */}
              <StreamViewerItem
                data={streamSession}
                viewCount={viewCount}
                onDonate={onDonate}
              />
              {/* about channel */}
              <AboutChannel data={streamSession} />
            </>
          )}
        </Box>
      </Box>
      {/* chat */}
      {streamSession && (
        <Chat
          w={{ base: 'full', lg: '340px' }}
          h={{ base: 700, md: 'full' }}
          streamSessionId={streamSessionId}
          canCollapse={true}
          isChatBoxCollapsed={isChatBoxCollapsed}
          handleColBtnClicked={handleColBtnClicked}
          chatEmojiPosition={{ position: 'absolute', bottom: '0px', right: '0px' }}
          chatMessages={chatMessages}
          sendChatMessage={sendChatMessage}
        />
      )}
    </Flex>
  )
}
export default StreamView
