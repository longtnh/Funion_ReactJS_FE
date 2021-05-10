import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsFillCalendarFill,
} from 'react-icons/bs'
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { COLOR } from '@/constants/styles'
import moment from 'moment'
import { PATH } from '@/constants/paths'
import { useHistory, Link as ReactLink, useRouteMatch } from 'react-router-dom'

const Calendar = ({
  events,
  onGetNextEvents,
  onClickFollow,
  onClickUnFollow,
  followingMaps,
}) => {
  const history = useHistory()
  let { url } = useRouteMatch()
  url = url.replace(/\/$/, '')
  const parentRef = useRef(null)
  const eventRefs = events.reduce((acc, value, index) => {
    acc[index] = React.createRef()
    return acc
  }, {})
  const [schedule, setSchedule] = useState<null | any>([] as any)
  const [clickBehindButton, setClickBehindButton] = useState(false)
  const [clickForwardButton, setClickForwardButton] = useState(false)
  const bgItem = useColorModeValue('gray.200', '#2b323a')
  const bgItemFlex = useColorModeValue('white', '#1d1f20')

  const onGetEvents = type => {
    onGetNextEvents(type)
  }

  const onFollow = useCallback(
    subEventId => {
      onClickFollow(subEventId)
    },
    [onClickFollow],
  )

  const onUnFollow = useCallback(
    subEventId => {
      onClickUnFollow(subEventId)
    },
    [onClickUnFollow],
  )

  const goToStreamSession = useCallback(
    streamSessionId => {
      history.push(`${PATH.STREAM_VIEW}/${streamSessionId}`)
    },
    [history],
  )

  useEffect(() => {
    let scheduleList = [] as any
    events.forEach((event: any) => {
      scheduleList.push({
        date: moment.utc(event.startDate).format('MMM-DD'),
        day: moment.utc(event.startDate).format('ddd'),
      })
    })
    setSchedule(scheduleList)
  }, [events])

  const scrollToEvent = id => {
    eventRefs[id].current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Box justify="center" flexDirection="column" mx={{ base: 5, md: 8 }}>
      <Flex w={{ base: '100%' }} boxShadow="md" rounded="md" backgroundColor="#fad2f9">
        <Button
          _hover={{ bg: 'pink.200' }}
          h={{ base: 24, lg: 20 }}
          minW={5}
          p={0}
          bg={COLOR.PRIMARY}
          onClick={() => {
            if (clickForwardButton === true) {
              onGetEvents('middle')
              setClickForwardButton(false)
            } else {
              onGetEvents('behind')
              setClickBehindButton(true)
            }
          }}
          mt={{ base: 1, sm: 2 }}
        >
          <BsFillCaretLeftFill width={2} color="white" />
        </Button>
        <SimpleGrid columns={7} w="full" overflowY="auto">
          {schedule.map((item: any, index) => (
            <Box
              flex="1"
              justifyContent="space-between"
              key={index}
              float="left"
              px={4}
              textAlign="center"
              backgroundColor="#fad2f9"
              cursor="pointer"
              onClick={() => scrollToEvent(index)}
              py={5}
              minW="115px"
            >
              <Text
                color="black"
                fontWeight="semibold"
                fontSize={{ base: 'md', lg: 'xl' }}
              >
                {item.date}
              </Text>
              <Text color="black">{item.day}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <Button
          _hover={{ bg: 'pink.200' }}
          h={{ base: 24, lg: 20 }}
          p={0}
          mt={{ base: 1, sm: 2 }}
          bg={COLOR.PRIMARY}
          minW={5}
          onClick={() => {
            if (clickBehindButton === true) {
              onGetEvents('middle')
              setClickBehindButton(false)
            } else {
              onGetEvents('forward')
              setClickForwardButton(true)
            }
          }}
        >
          <BsFillCaretRightFill width={2} color="white" />
        </Button>
      </Flex>
      <Box mt={1} width={{ base: '100%' }} maxH="full" ref={parentRef} p={5}>
        {events.map((item: any, index) => (
          <Box
            bg={bgItemFlex}
            key={index}
            mt={index === 0 ? 0 : 3}
            p={5}
            ref={eventRefs[index]}
            border={1}
            boxShadow="md"
            rounded="md"
          >
            <Box p={{ base: 5, md: 10 }}>
              <SimpleGrid columns={{ base: 1, md: 2 }}>
                <Flex
                  // color="black"
                  fontSize={{ base: 'lg', md: 'xl' }}
                  justifyContent="right"
                  mb={{ base: 2, md: 0 }}
                >
                  <BsFillCalendarFill color={COLOR.PRIMARY} fontSize={20} />
                  <Text display="inline" mx={3}>
                    {moment.utc(item.startDate).format('dddd MMM-DD')}
                  </Text>
                </Flex>
                <Box
                  fontSize={{ base: 'md', md: 'lg' }}
                  textAlign={{ base: 'left', md: 'right' }}
                >
                  <Text>{'We have ' + item.subEventInDate.length + ' matchs'}</Text>
                </Box>
              </SimpleGrid>
            </Box>
            {item.subEventInDate.map((schedule: any, index) => (
              <Box key={index} p={15} _hover={{ bg: bgItem }} borderRadius={10}>
                <SimpleGrid columns={{ base: 1, md: 3 }} verticalAlign="center">
                  <Box fontSize={{ base: 'md', md: 'lg' }}>
                    <Stack direction="row">
                      <Image
                        width={35}
                        height={35}
                        mr={15}
                        objectFit="cover"
                        src={process.env.API_ENDPOINT?.concat(schedule.eventLogo)}
                        onClick={
                          schedule.scheduleStatus === 'Happening'
                            ? () => goToStreamSession(schedule.streamSessionId)
                            : undefined
                        }
                      />
                      <Box>
                        <Text fontWeight="semibold">
                          <Link
                            as={ReactLink}
                            to={
                              schedule.scheduleStatus === 'Happening'
                                ? `${PATH.STREAM_VIEW}/${schedule.streamSessionId}`
                                : `${url}`
                            }
                          >
                            {schedule.eventTitle}
                          </Link>
                        </Text>
                        <Text mt={5}>
                          {moment.utc(schedule.startTime).format('HH:mm')}
                        </Text>
                      </Box>
                    </Stack>
                  </Box>
                  <Box></Box>
                  <Box textAlign={{ base: 'center', sm: 'right' }}>
                    {(() => {
                      switch (schedule.scheduleStatus) {
                        case 'NotHappenedYet':
                          return followingMaps[schedule.scheduleId] === true ? (
                            <Button
                              mt={15}
                              _hover={{ bg: 'gray.100', color: COLOR.PRIMARY }}
                              bg={COLOR.LIVE_RED}
                              color="white"
                              onClick={() => onUnFollow(schedule.scheduleId)}
                            >
                              UnFollow
                            </Button>
                          ) : (
                            <Button
                              mt={15}
                              _hover={{ bg: 'gray.100', color: COLOR.PRIMARY }}
                              bg={COLOR.PRIMARY}
                              color="white"
                              onClick={() => onFollow(schedule.scheduleId)}
                            >
                              Follow
                            </Button>
                          )
                        case 'Happening':
                          return (
                            <Button
                              mt={15}
                              _hover={{ bg: 'gray.100', color: 'yellow.400' }}
                              bg={COLOR.LIVE_RED}
                              color="white"
                              onClick={() => goToStreamSession(schedule.streamSessionId)}
                            >
                              Happening
                            </Button>
                          )
                        case 'Finished':
                          return (
                            <Button
                              mt={15}
                              _hover={{ bg: 'gray.100', color: 'gray.400' }}
                              color="gray.400"
                              bg="white"
                              variant="outline"
                            >
                              End
                            </Button>
                          )
                      }
                    })()}
                  </Box>
                </SimpleGrid>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default React.memo(Calendar)
