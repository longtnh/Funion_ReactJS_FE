/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chat from '../../components/Chat/Chat'
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Image,
  HStack,
  ButtonGroup,
  createStandaloneToast,
} from '@chakra-ui/react'
import AsyncSelect from 'react-select/async'
import StreamManagerNavBar from './components/StreamManagerNavBar/StreamManagerNavBar'
import RequiredField from '../../components/Form/RequiredField/RequiredField'
import { BsFillCircleFill } from 'react-icons/bs'
import { COLOR } from '@/constants/styles'
import Tag from '@/components/Tag/Tag'
import {
  finishStreamSession,
  getCategory,
  getStreamConfig,
  getStreamerMediaSource,
  getTagData,
  publishStreamSession,
} from './streammanager.thunk'
import { useForm, Controller } from 'react-hook-form'
import InputErrorMessage from '@/components/Form/InputErrorMessage/InputErrorMessage'
import { useStreamHub } from '@/hooks/StreamHubHooks'
import { SearchCategories, SearchTags, SearchEvent } from '@/services/SearchService'
import { clearPushNotifications } from './streammanager.actions'
import StreamPlayer from '@/components/StreamPlayer/StreamPlayer'
import { useNotificationHub } from '@/hooks/NotificationHubHooks'

const defaultValues = {
  title: '',
  announcement: '',
  category: { value: '', label: '' },
  tags: { value: '', label: '' },
  languageName: 'English',
  subEventId: { value: '', label: '' },
}

const StreamManager = () => {
  const dispatch = useDispatch()
  const toast = createStandaloneToast()
  const { handleSubmit, register, errors, control, reset } = useForm()
  const bg = useColorModeValue('#e5e5e5', '#464649')
  const bgSelect = useColorModeValue('#fff', '#1a202c')
  const bgOptionSelect = useColorModeValue('#fff', '#2d3748')
  const borderSelect = useColorModeValue('#e2e8f0', '#3f444e')
  const streamConfig = useSelector((state: AppState) => state.streamManager.streamConfig)
  const isStreaming = useSelector((state: AppState) => state.streamManager.isStreaming)
  const isPublishing = useSelector((state: AppState) => state.streamManager.isPublishing)
  const currentUser = useSelector((state: AppState) => state.app.currentUser)
  const streamSession = useSelector(
    (state: AppState) => state.streamManager.streamSession,
  )
  const categoryItem = useSelector((state: AppState) => state.streamManager.categoryItem)
  const pushNotifications = useSelector(
    (state: AppState) => state.streamManager.pushNotifications,
  )
  // Connect notification hub
  useNotificationHub()
  const { chatMessages, viewCount, sendChatMessage } = useStreamHub(
    streamSession?.StreamSessionId,
  )

  const [categoryGuid, setCategoryGuid] = useState<string | null>(null)

  // Load init data
  useEffect(() => {
    dispatch(getTagData())
    dispatch(getStreamConfig())
    dispatch(getStreamerMediaSource())
  }, [dispatch])

  // Load category
  useEffect(() => {
    if (!isPublishing || categoryGuid === null) return
    dispatch(getCategory(categoryGuid))
  }, [dispatch, isPublishing, categoryGuid])

  // Toast notifications
  useEffect(() => {
    if (pushNotifications.length === 0) return
    pushNotifications.map(n => toast(n))
    dispatch(clearPushNotifications())
  }, [dispatch, pushNotifications, toast])

  const reactSelectStyles = {
    control: base => ({
      ...base,
      background: bgSelect,
      borderColor: borderSelect,
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? '#cecece' : bgOptionSelect,
    }),
  }

  const handleFormSubmit = useCallback(
    values => {
      setCategoryGuid(values.category.value)
      values.tags = values.tags.map((tag: { value: any; label: any }) => ({
        id: tag.value,
        name: tag.label,
      }))
      values.category = {
        id: values.category.value,
        name: values.category.label,
      }
      values.subEventId = values.subEventId.value
      if (values.subEventId === '') delete values.subEventId
      dispatch(publishStreamSession(values))
    },
    [dispatch],
  )

  const handleStopStreamClick = useCallback(() => {
    dispatch(finishStreamSession())
    reset()
  }, [dispatch])

  // handle search category, tag, event
  const handleSearchCategory = useCallback(inputValue => SearchCategories(inputValue), [])
  const handleSearchTag = useCallback(inputValue => SearchTags(inputValue), [])
  const handleSearchEvent = useCallback(inputValue => SearchEvent(inputValue), [])

  const copyToClipboard = useCallback(textToCopy => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy)
    } else {
      let textArea = document.createElement('textarea')
      textArea.value = textToCopy
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      return new Promise<void>((res, rej) => {
        document.execCommand('copy') ? res() : rej()
        textArea.remove()
      })
    }
  }, [])

  return (
    <Box h="full">
      <StreamManagerNavBar
        viewCount={viewCount}
        followerCount={currentUser.followedCount}
      />
      <Flex h="calc(100% - 50px)" w="full" pos="fixed">
        <Chat
          w={{ base: 56, sm: 60, md: 64, lg: '26%' }}
          chatMessages={chatMessages}
          sendChatMessage={sendChatMessage}
          isHost
        />
        <Box overflowY="auto" w="full" display={{ md: 'block', lg: 'flex' }}>
          <Box w={{ lg: '70%', md: '100%' }}>
            <Text fontSize="sm" fontWeight="bold" w="full" bgColor={bg} pl={2}>
              Stream Preview
            </Text>
            {streamSession && <StreamPlayer streamSession={streamSession} />}
            <Flex w="full" justify="space-between" align="center" px={4} h={36}>
              <Flex>
                {categoryItem && (
                  <>
                    <Image
                      src={`${process.env.API_ENDPOINT}${categoryItem.pictureFilePath}`}
                      w={{ base: 16, xl: 24 }}
                      borderRadius="md"
                    />
                    <Flex ml={3} flexDirection="column" justify="center">
                      <Text fontSize="xl" fontWeight="bold">
                        {categoryItem.name}
                      </Text>
                      <HStack>
                        {categoryItem.tags.map((tag: Tag) => (
                          <Tag key={tag.id}>{tag.name}</Tag>
                        ))}
                      </HStack>
                    </Flex>
                  </>
                )}
              </Flex>
              <Flex align="center" visibility={isStreaming ? 'visible' : 'hidden'}>
                <HStack spacing={1}>
                  <BsFillCircleFill color="red" size={12} />
                  <Text fontWeight="bold">Live</Text>
                </HStack>
                <Text
                  ml={4}
                  px={3}
                  fontWeight="bold"
                  fontSize="sm"
                  borderWidth="1px"
                  borderRadius="xl"
                  bg="#04e8cf"
                >
                  EXCELLENT
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Box w={{ md: '100%', lg: '30%' }} borderWidth="1px" overflowY="auto">
            <Text fontSize="sm" fontWeight="bold" w="full" bgColor={bg} pl={2}>
              Stream Information
            </Text>
            <Box w="full" px={4} py={2}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <input
                  type="hidden"
                  ref={register}
                  name="streamerName"
                  value={currentUser.name}
                />
                <input
                  type="hidden"
                  ref={register}
                  name="streamerImageUrl"
                  value={`${process.env.IDENTITY_ENDPOINT}${currentUser.profile_image}`}
                />
                <FormControl>
                  <FormLabel>
                    <RequiredField>Title :</RequiredField>
                  </FormLabel>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Name"
                    ref={register({
                      required: 'This input is required.',
                    })}
                    isDisabled={isPublishing}
                  />
                  {errors.title && (
                    <InputErrorMessage>{errors.title.message}</InputErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>
                    <RequiredField>Announcement :</RequiredField>
                  </FormLabel>
                  <Textarea
                    name="announcement"
                    ref={register({
                      required: 'This input is required.',
                    })}
                    isDisabled={isPublishing}
                  />
                  {errors.announcement && (
                    <InputErrorMessage>{errors.announcement.message}</InputErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <RequiredField>Category :</RequiredField>
                  </FormLabel>
                  <Controller
                    name="category"
                    defaultValue=""
                    control={control}
                    render={({ onChange, value }) => (
                      <AsyncSelect
                        placeholder="Search Category..."
                        styles={reactSelectStyles}
                        onChange={selected => onChange(selected ? selected : '')}
                        value={value}
                        isDisabled={isPublishing}
                        isSearchable
                        isClearable
                        cacheOptions
                        defaultOptions
                        loadOptions={handleSearchCategory}
                      />
                    )}
                    rules={{ required: 'This input is required.' }}
                  />
                  {errors.category && (
                    <InputErrorMessage>{errors.category.message}</InputErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>
                    <RequiredField>Tags :</RequiredField>
                  </FormLabel>
                  <Controller
                    name="tags"
                    defaultValue=""
                    control={control}
                    render={({ onChange, value }) => (
                      <AsyncSelect
                        placeholder="Search Tags..."
                        onChange={value => {
                          onChange(value.length === 0 ? '' : value)
                        }}
                        value={value}
                        styles={reactSelectStyles}
                        isDisabled={isPublishing}
                        isSearchable
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={handleSearchTag}
                      />
                    )}
                    rules={{ required: 'This input is required.' }}
                  />
                  {errors.tags && (
                    <InputErrorMessage>{errors.tags.message}</InputErrorMessage>
                  )}
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>Stream Language : </FormLabel>
                  <Select name="languageName" ref={register} isDisabled={isPublishing}>
                    <option value="Eng">English</option>
                    <option value="Vie">Tiếng Việt</option>
                  </Select>
                </FormControl>
                <FormControl
                  mt={2}
                  style={{ display: currentUser.role === 'admin' ? 'block' : 'none' }}
                >
                  <FormLabel>
                    <FormLabel>(Admin) Publish to event:</FormLabel>
                  </FormLabel>
                  <Controller
                    name="subEventId"
                    defaultValue=""
                    control={control}
                    render={({ onChange, value }) => (
                      <AsyncSelect
                        placeholder="Search event"
                        styles={reactSelectStyles}
                        onChange={selected => onChange(selected ? selected : '')}
                        value={value}
                        isDisabled={isPublishing}
                        isSearchable
                        isClearable
                        defaultOptions
                        loadOptions={handleSearchEvent}
                        display="none"
                      />
                    )}
                  />
                  {errors.subEventId && (
                    <InputErrorMessage>{errors.subEventId.message}</InputErrorMessage>
                  )}
                </FormControl>
                <>
                  <FormControl mt={2}>
                    <FormLabel>Server URL :</FormLabel>
                    <ButtonGroup w="full" size="md" isAttached>
                      <Input
                        type="text"
                        name="serverURL"
                        borderLeftRadius="md"
                        borderRightRadius="none"
                        isReadOnly
                        isDisabled={isPublishing}
                        value={streamConfig ? streamConfig.serverUrl : ''}
                      />
                      <Button
                        borderLeftRadius="none"
                        borderRightRadius="md"
                        fontSize="sm"
                        onClick={() => {
                          copyToClipboard(streamConfig ? streamConfig.serverUrl : '')
                        }}
                      >
                        Copy
                      </Button>
                    </ButtonGroup>
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Stream Key :</FormLabel>
                    <ButtonGroup w="full" size="md" isAttached>
                      <Input
                        type="text"
                        name="streamKey"
                        borderLeftRadius="md"
                        borderRightRadius="none"
                        isReadOnly
                        isDisabled={isPublishing}
                        value={streamConfig ? streamConfig.streamKey : ''}
                      />
                      <Button
                        borderLeftRadius="none"
                        borderRightRadius="md"
                        fontSize="sm"
                        onClick={() => {
                          copyToClipboard(streamConfig ? streamConfig.streamKey : '')
                        }}
                      >
                        Copy
                      </Button>
                    </ButtonGroup>
                  </FormControl>
                </>
                <Button
                  width="full"
                  type="submit"
                  mt={4}
                  bg={COLOR.DIAMOND}
                  color="#FFF"
                  isDisabled={isPublishing}
                >
                  Start Stream
                </Button>
                <Button
                  width="full"
                  onClick={handleStopStreamClick}
                  mt={2}
                  bg={COLOR.LIVE_RED}
                  color="#FFF"
                >
                  Stop Stream
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default StreamManager
