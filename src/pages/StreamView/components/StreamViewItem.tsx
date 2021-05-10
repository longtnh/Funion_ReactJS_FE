/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import Tag from '@/components/Tag/Tag'
import { COLOR } from '@/constants/styles'
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { FaCircle, FaEye, FaHeart, FaShareSquare } from 'react-icons/fa'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { RiMoneyDollarCircleLine, RiMore2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { PATH } from '@/constants/paths'
import moment from 'moment'
import { followUser, unFollowUser } from '@/pages/StreamView/streamView.thunk'
import { useForm } from 'react-hook-form'
import { getPaymentData } from '../streamView.thunk'

interface Props {
  data: StreamSession
  viewCount: number
  onDonate: any
}

const StreamViewerItem = ({ data, viewCount, onDonate, ...extraProps }: Props) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit } = useForm()
  const userPayment = useSelector((state: AppState) => state.streamView.payments)
  const isFollowing = useSelector((state: AppState) => state.streamView.isFollowing)
  const currentUser = useSelector((state: AppState) => state.app.currentUser)

  useEffect(() => {
    dispatch(getPaymentData())
  }, [dispatch])

  const handleFollowBtn = useCallback(
    () => dispatch(followUser(data.streamerIdentityGuid)),
    [dispatch],
  )
  const handleUnFollowBtn = useCallback(
    () => dispatch(unFollowUser(data.streamerIdentityGuid)),
    [dispatch],
  )

  const [startTime] = useState(moment(data.createdDate))
  const [streamTime, setStreamTime] = useState('')

  useEffect(() => {
    setTimeout(
      () => setStreamTime(moment.utc(moment().diff(data.createdDate)).format('00:mm:ss')),
      1000,
    )
  }, [data.createdDate, streamTime, startTime])

  const onSubmit = useCallback(value => {
    onDonate(value.amount, data.streamerIdentityGuid, data.id, currentUser.name, value.message, userPayment.balance)
  }, [])

  return (
    <Flex {...extraProps} mt={{ base: 2, sm: 4 }}>
      <Box pl={2} mt={2} mr={{ base: 4, md: 0 }} w={100} position="relative">
        <Avatar size="50px" src={data.streamerImageUrl} />
        <Center
          position="absolute"
          bottom={{ base: 6, sm: 5, md: -1 }}
          left={{ base: 5, md: '26px', lg: 7 }}
          px={2}
          bgColor="#fc0303"
          color="white"
          fontWeight="bold"
          fontSize="xs"
          borderRadius="md"
        >
          LIVE
        </Center>
      </Box>
      <Box w="full" ml={3}>
        <HStack>
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
            {data.title}
          </Text>
          <Spacer />
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
          {/* Donate btn */}
          <Button
            to=""
            bg="white"
            border="2px"
            borderColor={COLOR.DIAMOND}
            display={{ base: 'none', sm: 'flex', md: 'flex', lg: 'flex' }}
            size="sm"
            onClick={onOpen}
          >
            <Center>
              <RiMoneyDollarCircleLine size={20} color={COLOR.DIAMOND} />
            </Center>
            <Text color={COLOR.DIAMOND} ml={2}>
              Donate
            </Text>
          </Button>
        </HStack>
        <HStack display={{ base: 'block', md: 'flex', lg: 'flex' }}>
          <Box w="full">
            <Text>
              <Link
                as={ReactLink}
                fontWeight="semibold"
                to={`${PATH.PROFILE_VIEW}/${data.streamerIdentityGuid}`}
                color={COLOR.BLUE_TEXT}
                _hover={{ color: COLOR.PRIMARY }}
              >
                {data.streamerName}
              </Link>
            </Text>
            <HStack mt={{ base: 0, md: 1 }}>
              <Link
                as={ReactLink}
                fontWeight="medium"
                to={`${PATH.BROWSE_ITEM}/${data.category && data.category.id}`}
                color={COLOR.GRAY_TEXT}
                _hover={{ color: COLOR.PRIMARY }}
              >
                {data.category && data.category.name}
              </Link>
              <Box display={{ base: 'none', md: 'block' }}>
                <FaCircle size={5} />
              </Box>
              {/* tag */}
              <Flex align="center">
                {data.tags &&
                  data.tags.map((tag: Tag, index: number) => (
                    <Tag key={tag.id} mr={1} display={{ base: 'none', md: 'block' }}>
                      {tag.name}
                    </Tag>
                  ))}
              </Flex>
            </HStack>
          </Box>
          {/* time and viewer */}
          <Box>
            <HStack spacing={2}>
              <HStack>
                <FaEye />
                <Text>{viewCount}</Text>
              </HStack>
              <Text>{streamTime}</Text>
              <FaShareSquare size={20} />
              <RiMore2Fill size={20} />
            </HStack>
          </Box>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>DONATE</ModalHeader>
          <Flex pl={6}>
            <Text display="inline">Balance: {userPayment.balance}</Text>
            <RiMoneyDollarCircleLine display="inline" size={20} color={COLOR.DIAMOND} />
          </Flex>
          <ModalCloseButton />
          <ModalBody>
              <FormControl>
                <Flex>
                  <FormLabel>Send coin</FormLabel>
                </Flex>
                <NumberInput>
                  <NumberInputField name="amount" ref={register} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl  mt={2}>
                <FormLabel>Send Message :</FormLabel>
                <Input type="text" name="message" placeholder="Send message" ref={register} />
              </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" type="submit" onClick={onClose}>Send</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
export default React.memo(StreamViewerItem)
