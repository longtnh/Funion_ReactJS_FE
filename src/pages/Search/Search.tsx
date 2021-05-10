import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Flex, HStack, Divider, Text, SimpleGrid } from '@chakra-ui/react'
import UserSearch from '../Search/components/UserSearch'
import StreamSessionSearch from '../Search/components/StreamSessionSearch'
import CategoryItem from '../../components/Category/CategoryItem/CategoryItem'
import {
  getStreamSessionsSearchData,
  getCategorySearchData,
  getUserSearchData,
} from '../Search/search.thunk'
import { useLocation } from 'react-router-dom'

const Search = () => {
  const dispatch = useDispatch()
  const isSideBarCollapsed = useSelector(
    (state: AppState) => state.app.isSideBarCollapsed,
  )
  const streamSessions = useSelector((state: AppState) => state.search.streamSessions)
  const users = useSelector((state: AppState) => state.search.user)
  const categories = useSelector((state: AppState) => state.search.category)
  const location = useLocation<string>()

  const keyword = location.state

  useEffect(() => {
    dispatch(getStreamSessionsSearchData(keyword))
    dispatch(getCategorySearchData(keyword))
    dispatch(getUserSearchData(keyword))
  }, [dispatch, keyword])

  return (
    <Box mx={{ base: 3, md: 5, lg: 9 }}>
      <Box>
        <Text my={5} fontSize="xl" fontWeight="bold">
          Search result for : {keyword}
        </Text>
        <Divider />
      </Box>
      <Box my={5}>
        <Text fontSize="xl" fontWeight="bold">
          User
        </Text>
        <Box>
          {users.length ? (
            users.map((user: User) => (
              <UserSearch
                key={user.id}
                data={user}
                w={{ md: 'full', lg: '48rem' }}
                mx={{ lg: 10 }}
              />
            ))
          ) : (
            <Text py={2}>No results found for {keyword}</Text>
          )}
        </Box>
      </Box>
      <Box my={5}>
        <Text fontSize="xl" fontWeight="bold">
          Stream Session
        </Text>
        <Flex
          alignItems="center"
          justify={{ base: 'center', sm: 'center', md: 'start' }}
          overflowX="auto"
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: isSideBarCollapsed ? 6 : 5 }}
          >
            {streamSessions.length ? (
              streamSessions.map((streamSession: StreamSessionSearchResult) => (
                <StreamSessionSearch key={streamSession.id} data={streamSession} />
              ))
            ) : (
              <Text py={2}>No results found for {keyword}</Text>
            )}
          </SimpleGrid>
        </Flex>
      </Box>
      <Box my={5}>
        <Text fontSize="xl" fontWeight="bold">
          Category
        </Text>
        <Flex overflowX="auto">
          <HStack>
            {categories.length ? (
              categories.map((category: Category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  px={1}
                  pb={3}
                  w={{ base: 40, md: 36 }}
                />
              ))
            ) : (
              <Text py={2}>No results found for {keyword}</Text>
            )}
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}

export default Search
