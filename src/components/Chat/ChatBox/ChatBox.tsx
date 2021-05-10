import { ChatMessage } from '@/@types/chat'
import { ChatMessageType } from '@/@types/enums'
import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import ChattingMessage from './ChattingMessage'
import DonateMessage from './DonateMessage'

interface Props {
  data: ChatMessage[]
}

const ChatBox = (props: Props) => {
  const { data } = props
  const bottomChatBoxRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (data.length === 0) return
    bottomChatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data])

  return (
    <Box w="full" h="full" overflowY="auto" px={3} py={2}>
      <Text fontSize="sm" opacity="0.9">
        Welcome to the chat room!
      </Text>
      {data.map((message, index: number) =>
        message.type === ChatMessageType.Message ? (
          <ChattingMessage key={index} message={message} />
        ) : (
          <DonateMessage key={index} message={message} />
        ),
      )}
      <Box ref={bottomChatBoxRef}></Box>
    </Box>
  )
}
export default React.memo(ChatBox)
