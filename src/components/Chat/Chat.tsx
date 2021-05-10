/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'
import {
  Box,
  Input,
  Text,
  Flex,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from '@chakra-ui/react'
import { COLOR } from '@/constants/styles'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { IoArrowForward } from 'react-icons/io5'
import ChatBox from './ChatBox/ChatBox'
import { Controller, useForm } from 'react-hook-form'
import { ChatMessageType } from '@/@types/enums'

const Chat = props => {
  const {
    isHost = false,
    canCollapse,
    isChatBoxCollapsed,
    handleColBtnClicked,
    chatEmojiPosition,
    chatMessages,
    sendChatMessage,
    ...extraProps
  } = props
  const inputBg = useColorModeValue('#e5e5e5', '#464649')
  const { register, handleSubmit, control } = useForm()
  const [currentMessage, setCurrentMessage] = useState('')

  const onFormSubmit = async values => {
    if (values.content === '') return
    values.type = ChatMessageType.Message
    await sendChatMessage(values)
    setCurrentMessage('')
  }

  const handleOnKeyDown = useCallback(event => {
    if (event.key === 'Enter') {
      handleSubmit(onFormSubmit)()
    }
  }, [])

  const handleOnInputChange = useCallback(event => {
    setCurrentMessage(event.target.value)
  }, [])

  let emojiPicker = (
    <Picker
      onSelect={emoji => setCurrentMessage(`${currentMessage} ${emoji.native}`)}
      // set="facebook"
      theme="light"
      sheetSize={32}
      emojiSize={22}
      style={chatEmojiPosition}
    />
  )
  return (
    <Flex
      display={isChatBoxCollapsed ? 'none' : 'flex'}
      borderWidth="1px"
      {...extraProps}
    >
      <VStack spacing={0} w="full">
        <Flex position="relative" w="full" boxShadow="md" align="center" p={2}>
          {canCollapse && (
            <Button
              position="absolute"
              aria-label=""
              variant="ghost"
              _focus={{}}
              colorScheme="white"
              fontSize="xl"
              p={0}
              leftIcon={<IoArrowForward />}
              onClick={handleColBtnClicked}
            />
          )}
          <Text w="full" align="center" fontWeight="bold" fontSize="md">
            STREAM CHAT
          </Text>
        </Flex>
        <ChatBox data={chatMessages} />
        <Box w="full">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Box px={2}>
              <Controller
                render={() => <Input type="hidden" ref={register} />}
                name="isHost"
                defaultValue={isHost}
                control={control}
              />
              <InputGroup>
                <Input
                  type="text"
                  pl={3}
                  borderWidth={0}
                  name="content"
                  ref={register}
                  bgColor={inputBg}
                  placeholder="Send a message"
                  value={currentMessage}
                  onChange={handleOnInputChange}
                  onKeyPress={handleOnKeyDown}
                />
                <InputRightElement>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Button bgColor={inputBg}>😁</Button>
                    </PopoverTrigger>
                    <PopoverContent>{emojiPicker}</PopoverContent>
                  </Popover>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Flex w="full" justify="flex-end" py={2} pr={2}>
              <Button size="sm" bgColor={COLOR.DIAMOND} type="submit">
                Chat
              </Button>
            </Flex>
          </form>
        </Box>
      </VStack>
    </Flex>
  )
}

export default React.memo(Chat)
