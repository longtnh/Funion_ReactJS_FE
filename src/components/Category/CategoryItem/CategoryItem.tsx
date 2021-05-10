/* eslint-disable react-hooks/exhaustive-deps */
import { PATH } from '@/constants/paths'
import shortenTags from '@/utils/shortenTags'
import { Box, HStack, Image, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Tag from '../../Tag/Tag'

const CategoryItem = props => {
  const history = useHistory()
  const { category, ...extraProps } = props

  const goToCategoryChannel = useCallback(() => {
    history.push(`${PATH.BROWSE_ITEM}/${category.id}`)
  }, [history])

  const shortenedTags = shortenTags(category.tags, 14)
  const pictureFilePath = `${process.env.API_ENDPOINT}${category.pictureFilePath}`

  return (
    // Combine image, name, following link to 1 page
    <Box {...extraProps}>
      <Box onClick={goToCategoryChannel}>
        {/* Image */}
        <Box
          my={3}
          _hover={{
            boxShadow: '-4px 6px #FB46CA',
            cursor: 'pointer',
            transition: '0.2s',
            mt: 2,
            mb: 4,
          }}
        >
          <Image w="full" src={pictureFilePath} />
        </Box>
        {/* Info category */}
        <Text
          _hover={{ color: '#FB46CA', cursor: 'pointer' }}
          fontSize="md"
          fontWeight="semibold"
          noOfLines={1}
        >
          {category.name}
        </Text>
        <Text
          _hover={{ color: '#FB46CA', cursor: 'pointer' }}
          fontSize="sm"
          fontWeight="medium"
        >
          {category.following} Following
        </Text>
      </Box>
      {/* Tag */}
      <Box>
        <HStack mt={2} spacing={1}>
          {shortenedTags.map((tag: Tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </HStack>
      </Box>
    </Box>
  )
}

export default React.memo(CategoryItem)
