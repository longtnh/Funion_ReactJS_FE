import { COLOR } from '@/constants/styles'
import {
  Box,
  Button,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import '../css/pagination.css'
import moment from 'moment'
import SubEventModal from './Component/subEventModal'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { deleteSubEventAdmin } from './adminSubEvent.thunk'

const AdminSubEvent = () => {
  const dispatch = useDispatch()
  const location = useLocation<SubEvent[]>()
  const { eventId } = useParams<{ eventId: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const subEvent = location.state

  const subEvents = useSelector((state: AppState) =>
    state.adminSubEvent.subEvent.concat(subEvent),
  )

  useEffect(() => {}, [dispatch])

  const onClickDelete = useCallback(
    (subEventId: string) => {
      dispatch(deleteSubEventAdmin(subEventId))
    },
    [dispatch],
  )

  const [currentPage, setCurrentPage] = useState(1)

  const PER_PAGE = 10
  const offset = currentPage * PER_PAGE
  const temp = Math.ceil(subEvents.length / PER_PAGE)
  const currentPageData = subEvents.slice(offset === 10 ? 0 : offset, offset + PER_PAGE)
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
            SubEvents Manager (Event Id: {eventId} )
          </Text>
          <Text color="#FFF" fontSize={{ base: 'md', md: 'lg' }}>
            Showing {currentPage === 1 ? '1' : currentPage.toString() + '1'}-
            {currentPageData.length < 10
              ? currentPageData.length
              : currentPage.toString() + '0'}{' '}
            of {subEvents && subEvents.length} items
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
        <Button
          w={{ base: 96, md: 'auto' }}
          p={5}
          bg={COLOR.PRIMARY}
          color="#FFF"
          _hover={{ bg: '#fa64d1' }}
          onClick={() => onOpen()}
        >
          <Text fontSize="md">Add Sub Event</Text>
        </Button>
      </Flex>

      <Table mt={6} border="1px" borderColor="gray.200">
        <Thead>
          <Tr bg="#ebebe0">
            <Th>SubEventID</Th>
            <Th>Status</Th>
            <Th>StreamID</Th>
            <Th>StartTime</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {currentPageData &&
            currentPageData.map(subEvent => (
              <Tr key={subEvent.id}>
                <Td>{subEvent.id}</Td>
                <Td>{subEvent.status}</Td>
                <Td>{subEvent.streamSessionId}</Td>
                <Td>{moment(subEvent.startTime).format('YYYY-MM-DD HH:mm')}</Td>
                <Td>
                  <HStack mt={-1} spacing={3}>
                    {/* <Button bg="#0000ff" color="#FFF" _hover={{ bg: '#5c5c3d' }}>
                      <Text fontSize="md">Edit</Text>
                    </Button> */}
                    <Button
                      p={5}
                      bg="#ff0000"
                      color="#FFF"
                      _hover={{ bg: '#5c5c3d' }}
                      onClick={() => onClickDelete(subEvent.id)}
                    >
                      <Text fontSize="md">Delete</Text>
                    </Button>
                  </HStack>
                </Td>
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
      <SubEventModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        eventId={eventId}
      />
    </Box>
  )
}

export default AdminSubEvent
