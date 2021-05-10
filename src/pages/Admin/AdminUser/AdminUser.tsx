import { COLOR } from '@/constants/styles'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { banButton } from './adminUser.action'
import { getUserAdmin } from './adminUser.thunk'
import ReactPaginate from 'react-paginate'
import '../css/pagination.css'

const AdminUser = () => {
  const dispatch = useDispatch()
  const isBan = useSelector((state: AppState) => state.adminUser.isBan)
  const handleBanBtn = useCallback(() => dispatch(banButton()), [dispatch])
  const users = useSelector((state: AppState) => state.adminUser.users)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getUserAdmin())
  }, [dispatch])

  const PER_PAGE = 10
  const offset = currentPage * PER_PAGE
  const temp = Math.ceil(users.length / PER_PAGE)
  const currentPageData = users.slice(offset === 10 ? 0 : offset, offset + PER_PAGE)
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
            Users Manager
          </Text>
          <Text color="#FFF" fontSize={{ base: 'md', md: 'lg' }}>
            Showing {currentPage === 1 ? '1' : currentPage.toString() + '1'}-
            {currentPageData.length < 10
              ? currentPageData.length
              : currentPage.toString() + '0'}{' '}
            of {users && users.length} items
          </Text>
        </Flex>
      </Box>
      <Box w={{ base: 'full', md: 'xl' }} my={{ base: 6, md: 0 }}>
        <HStack spacing={5} mt={5}>
          <ButtonGroup w="full" size="md" isAttached>
            <Input
              borderLeftRadius="md"
              borderRightRadius="none"
              pl={4}
              placeholder="Search"
            />
            <IconButton
              aria-label="Search"
              icon={<RiSearchLine />}
              borderLeftRadius="none"
              borderRightRadius="md"
            />
          </ButtonGroup>
          <Button mt={5} p={5} bg={COLOR.PRIMARY} color="#FFF" _hover={{ bg: '#fa64d1' }}>
            <Text fontSize="md">Search</Text>
          </Button>
        </HStack>
      </Box>

      <Table mt={6} border="1px" borderColor="gray.200">
        <Thead>
          <Tr bg="#ebebe0">
            <Th>Id</Th>
            <Th>UserName</Th>
            <Th>Email</Th>
            <Th>Gender</Th>
            <Th>DisplayName</Th>
            <Th>Bio</Th>
            <Th>FollowingCount</Th>
            <Th>FollowerCount</Th>
            <Th>BanStatus</Th>
          </Tr>
        </Thead>

        <Tbody>
          {currentPageData &&
            currentPageData.map(user => (
              <Tr key={user.userID}>
                <Td>{user.userID}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.displayName}</Td>
                <Td>{user.bio}</Td>
                <Td>{user.followingCount}</Td>
                <Td>{user.followerCount}</Td>
                <Td>
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
    </Box>
  )
}

export default AdminUser
