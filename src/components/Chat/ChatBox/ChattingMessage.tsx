import React from 'react'
import { chakra, Text, Box } from '@chakra-ui/react'
import getHexFromString from '@/utils/getHexFromString'
import { ChatMessage } from '@/@types/chat'
import { COLOR } from '@/constants/styles'

interface Props {
  key: number
  message: ChatMessage
}

const ChattingMessage = ({ key, message }: Props) => (
  <Box key={key}>
    <Text>
      {message.isHost && (
        <chakra.span
          px={1}
          mr={1}
          fontWeight="bold"
          borderRadius="md"
          display="inline-block"
          color="#fff"
          bg={COLOR.PRIMARY}
        >
          Owner
        </chakra.span>
      )}
      <chakra.span
        mr={1}
        fontWeight="bold"
        display="inline-block"
        color={getHexFromString(message.userName)}
      >
        {message.userName}
      </chakra.span>
      {message.content}
    </Text>
  </Box>
)

export default React.memo(ChattingMessage)
