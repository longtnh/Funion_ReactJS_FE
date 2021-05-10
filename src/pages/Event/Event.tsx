import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import {
  getTopCategoriesData,
  getSchedule,
  followEvent,
  unFollowEvent,
} from './event.thunks'
import CategoryItem from '@/components/Category/CategoryItem/CategoryItem'
import { useDispatch, useSelector } from 'react-redux'
import Calendar from '@/pages/Event/components/Calendar'
import AsyncSelect from 'react-select/async'
import { SearchCategories } from '@/services/SearchService'
import moment from 'moment'

const Event = () => {
  const dispatch = useDispatch()
  const topCategories = useSelector((state: AppState) => state.event.topCategories)
  const events = useSelector((state: AppState) => state.event.events)
  const followingMaps = useSelector((state: AppState) => state.event.followingMaps)
  const [isSearching, setIsSearching] = useState(false)
  const [currentCategoryId, setCurrentCategoryId] = useState('')
  const [currentCategoryName, setCurrentCategoryName] = useState('')
  const bgSelect = useColorModeValue('#fff', '#1a202c')
  const bgOptionSelect = useColorModeValue('#fff', '#2d3748')
  const borderSelect = useColorModeValue('#e2e8f0', '#3f444e')

  const onGetNextEvents = type => {
    dispatch(
      getSchedule(moment(new Date()).format('YYYY-MM-DD'), type, currentCategoryId),
    )
  }

  const onClickFollow = useCallback(
    subEventId => {
      dispatch(followEvent(subEventId))
    },
    [dispatch],
  )

  const onClickUnFollow = useCallback(
    subEventId => {
      dispatch(unFollowEvent(subEventId))
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(getTopCategoriesData())
    dispatch(
      getSchedule(moment(new Date()).format('YYYY-MM-DD'), 'middle', currentCategoryId),
    )
  }, [currentCategoryId, dispatch])

  const handleSelected = useCallback(
    selected => {
      dispatch(
        getSchedule(
          moment(new Date()).format('YYYY-MM-DD'),
          'middle',
          selected ? selected.value : 0,
        ),
      )
      if (selected) {
        setIsSearching(true)
        setCurrentCategoryId(selected.value)
        setCurrentCategoryName(selected.label)
      } else {
        setIsSearching(false)
        setCurrentCategoryId('')
        setCurrentCategoryName('')
      }
    },
    [dispatch],
  )

  const handleOnSelectInputChange = useCallback(
    inputValue => SearchCategories(inputValue),
    [],
  )

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

  return (
    <>
      <VStack p={5} alignItems="left">
        <Box>
          <Text fontSize="5xl" my={1} fontWeight="bold">
            Events
          </Text>
          <HStack>
            <Text fontSize="sm" fontWeight="bold">
              Filter By
            </Text>
            <Box w={{ base: 'full', md: 64, lg: 80, xl: 96 }}>
              <AsyncSelect
                placeholder="Search Category..."
                onChange={handleSelected}
                styles={reactSelectStyles}
                isClearable
                cacheOptions
                defaultOptions
                loadOptions={handleOnSelectInputChange}
              />
            </Box>
          </HStack>
        </Box>
        <Flex overflowX="auto">
          {!isSearching ? (
            <HStack>
              {topCategories &&
                topCategories.map((category: Category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    px={1}
                    pb={3}
                    w={{ base: 40, md: 48 }}
                  />
                ))}
            </HStack>
          ) : (
            <HStack>
              {topCategories &&
                topCategories
                  .filter(c => c.name === currentCategoryName)
                  .map((category: Category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      px={1}
                      pb={3}
                      w={{ base: 40, md: 40 }}
                    />
                  ))}
            </HStack>
          )}
        </Flex>
      </VStack>
      {events && (
        <Calendar
          events={events}
          followingMaps={followingMaps}
          onGetNextEvents={onGetNextEvents}
          onClickFollow={onClickFollow}
          onClickUnFollow={onClickUnFollow}
        />
      )}
    </>
  )
}

export default Event
