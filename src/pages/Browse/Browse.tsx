/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import AsyncSelect from 'react-select/async'
import CategoryItem from '@/components/Category/CategoryItem/CategoryItem'
import { COLOR } from '@/constants/styles'
import { getCategoriesData } from './browse.thunk'
import { SearchTags } from '@/services/SearchService'
import ReactDOM from 'react-dom'

const Browse = () => {
  const dispatch = useDispatch()
  const isSideBarCollapsed = useSelector(
    (state: AppState) => state.app.isSideBarCollapsed,
  )
  const [searchTagIds, updateSearchTagIds] = useState<string[]>([])

  const pageIndex = useSelector((state: AppState) => state.browse.pageIndex)
  const pageSize = useSelector((state: AppState) => state.browse.pageSize)
  const categories = useSelector((state: AppState) => state.browse.categories)
  const isFetching = useSelector((state: AppState) => state.browse.isFetching)
  // const searchTagIds = useSelector((state: AppState) => state.browse.searchTagIds)
  const handelOnScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return
    dispatch(getCategoriesData(pageIndex + 1, pageSize, searchTagIds))
  }, [])

  useEffect(() => {
    // dispatch(getTagData())
    dispatch(getCategoriesData(0, pageSize))
    ReactDOM.findDOMNode(this)?.parentNode?.addEventListener('scroll', handelOnScroll)
    return () =>
      ReactDOM.findDOMNode(this)?.parentNode?.removeEventListener(
        'scroll',
        handelOnScroll,
      )
  }, [dispatch])

  const handleTagChange = useCallback(
    selected => {
      updateSearchTagIds(selected.map(tag => tag.value))
      dispatch(
        getCategoriesData(
          0,
          pageSize,
          selected.map(tag => tag.value),
        ),
      )
    },
    [dispatch],
  )

  const handleOnSelectInputChange = useCallback(inputValue => SearchTags(inputValue), [])

  const reactSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: '#FFFFFF',
      cursor: 'pointer',
      borderColor: '#A09C9C',
      bolder: 10,
      boxShadow: null,
      '&:hover': {
        // Overwrites the different states of border
        borderColor: state.isFocused ? '#FB46CA' : '#8B8B8B',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      fontSize: 16,
      textAlign: 'left',
      cursor: 'pointer',
      '&:hover': {
        color: state.isFocused ? '#FB46CA' : '',
      },
    }),
  }

  return (
    <Box p={{ base: 3, sm: 6, md: 6, lg: 6 }} onScroll={handelOnScroll}>
      <Text fontSize="5xl" my={1} fontWeight="bold">
        Browse
      </Text>
      <Box mt={2}>
        <Text fontSize="2xl" fontWeight="bold" color={COLOR.PRIMARY}>
          Categories
        </Text>
      </Box>
      {/* Filter */}
      <Flex mt={3}>
        <HStack>
          <Text fontSize="sm" fontWeight="bold">
            Filter By
          </Text>
          <Box w={{ base: 56, md: 64, lg: 80, xl: 96 }}>
            <AsyncSelect
              placeholder="Search Tags..."
              onChange={handleTagChange}
              styles={reactSelectStyles}
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={handleOnSelectInputChange}
            />
          </Box>
        </HStack>
      </Flex>
      {/* Show category */}
      <SimpleGrid
        columns={{
          base: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: isSideBarCollapsed ? 8 : 7,
        }}
        spacing={2}
      >
        {categories.map((category: Category) => (
          <CategoryItem category={category} key={category.id} w="full" my={1} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Browse
