import { COLOR } from '@/constants/styles'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Image,
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { getEventAdmin, getEventSearchData } from './adminEvent.thunk'
import '../css/pagination.css'
import ReactPaginate from 'react-paginate'
import EventModal from './Component/eventModal'
import moment from 'moment'
import { PATH } from '@/constants/paths'

const AdminEvent = () => {
  const dispatch = useDispatch()
  const events = useSelector((state: AppState) => state.adminEvent.event)
  const eventsSearch = useSelector((state: AppState) => state.adminEvent.eventSearch)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keywordSearch, setKeywordSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    dispatch(getEventAdmin())
  }, [dispatch])

  const onClickSearch = useCallback(() => {
    dispatch(getEventSearchData(keywordSearch))
    setIsSearching(true)
  }, [dispatch, keywordSearch])

  const onClickClearSearch = useCallback(() => {
    setKeywordSearch('')
    setIsSearching(false)
  }, [])

  const [currentPage, setCurrentPage] = useState(1)

  const PER_PAGE = 10
  const offset = currentPage * PER_PAGE
  const temp = Math.ceil(events.length / PER_PAGE)
  const currentPageData = !isSearching
    ? events.slice(offset === 10 ? 0 : offset, offset + PER_PAGE)
    : eventsSearch.slice(offset === 10 ? 0 : offset, offset + PER_PAGE)
  const pageCount = Number.isInteger(temp) ? temp : temp + 1

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }

  return (
    <Box w="full" p={4}>
      <Box h={{ base: 24, md: 16 }} p={4} bg={COLOR.PRIMARY} borderRadius="md">
        <Flex
          w="full"
          align="center"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
        >
          <Text color="#FFF" fontSize="2xl" fontWeight="bold">
            Events Manager
          </Text>
          <Text color="#FFF" fontSize={{ base: 'md', md: 'lg' }}>
            Showing {currentPage === 1 ? '1' : currentPage.toString() + '1'}-
            {currentPageData.length < 10
              ? currentPageData.length
              : currentPage.toString() + '0'}{' '}
            of {events && events.length} items
          </Text>
        </Flex>
      </Box>
      <Flex
        w="full"
        align="center"
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        mt={5}
      >
        <Box w={{ base: 'full', md: 'xl' }} my={{ base: 6, md: 0 }}>
          <HStack spacing={5}>
            <ButtonGroup w="full" size="md" isAttached>
              <Input
                borderLeftRadius="md"
                borderRightRadius="none"
                pl={4}
                placeholder="Search"
                value={keywordSearch}
                onChange={e => setKeywordSearch(e.target.value)}
              />
              <IconButton
                aria-label="Search"
                icon={<RiSearchLine />}
                borderLeftRadius="none"
                borderRightRadius="md"
                onClick={onClickSearch}
              />
            </ButtonGroup>
            <Button
              mt={5}
              p={5}
              bg={COLOR.PRIMARY}
              color="#FFF"
              _hover={{ bg: '#fa64d1' }}
              isDisabled={!isSearching ? true : false}
              onClick={onClickClearSearch}
            >
              <Text fontSize="md">Clear Search</Text>
            </Button>
          </HStack>
        </Box>
        <Button
          w={{ base: 96, md: 'auto' }}
          p={5}
          bg={COLOR.PRIMARY}
          color="#FFF"
          _hover={{ bg: '#fa64d1' }}
        >
          <Text fontSize="md" onClick={() => onOpen()}>
            Add Event
          </Text>
        </Button>
      </Flex>

      <Table mt={6} border="1px" borderColor="gray.200">
        <Thead>
          <Tr bg="#ebebe0">
            <Th>Id</Th>
            <Th>Event Name</Th>
            <Th>Event Image Logo</Th>
            <Th>Category ID</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Sub Event</Th>
            {/* <Th>Ban Status</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {currentPageData &&
            currentPageData.map(event => (
              <Tr key={event.id}>
                <Td>{event.id}</Td>
                <Td>{event.name}</Td>
                <Td>
                  <Image
                    width={35}
                    height={35}
                    mr={15}
                    objectFit="cover"
                    src={process.env.API_ENDPOINT?.concat(event.logoImageFilePath)}
                  />
                </Td>
                <Td>{event.categoryId}</Td>
                <Td>{moment(event.startTime).format('YYYY-MM-DD HH:mm')}</Td>
                <Td>{moment(event.endTime).format('YYYY-MM-DD HH:mm')}</Td>
                <Td>
                  <Link
                    as={ReactLink}
                    to={{
                      pathname: `${'/admin'}${PATH.ADMIN_SUB_EVENT}/${event.id}`,
                      state: event.subEvents,
                    }}
                  >
                    View Details
                  </Link>
                </Td>
                {/* <Td>
                  <Button
                    mt={-1}
                    onClick={handleBanBtn}
                    p={5}
                    bg={isBan ? '#0000ff' : '#ff0000'}
                    color="#FFF"
                    _hover={{ bg: '#5c5c3d' }}
                  >
                    <Text fontSize="md">{isBan ? 'Ban' : 'Unban'}</Text>
                  </Button>
                </Td> */}
              </Tr>
            ))}
        </Tbody>
      </Table>
      <ReactPaginate
        className="pagination"
        previousLabel={'«'}
        nextLabel={'»'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
      <EventModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default AdminEvent
