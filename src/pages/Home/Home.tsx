/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { Text, Box, Link, HStack, Flex } from '@chakra-ui/react'
import { COLOR } from '@/constants/styles'
import { PATH } from '@/constants/paths'
import Swiper from 'react-id-swiper/lib/ReactIdSwiper'
import 'swiper/css/swiper.css'
import StreamItem from '../../components/StreamItem/StreamItem'
import CategoryItem from '../../components/Category/CategoryItem/CategoryItem'
import { getCategoriesData } from '../Browse/browse.thunk'
import { getStreamSessionsData } from '../Home/home.thunk'
import StreamSliderItem from './components/StreamSliderItem/StreamSliderItem'

const Home = () => {
  const dispatch = useDispatch()
  const streamSessions = useSelector((state: AppState) => state.home.streamSessions)
  const pageIndex = useSelector((state: AppState) => state.browse.pageIndex)
  const pageSize = useSelector((state: AppState) => state.browse.pageSize)
  const categories = useSelector((state: AppState) => state.browse.categories)

  useEffect(() => {
    dispatch(getCategoriesData(pageIndex, pageSize))
    dispatch(getStreamSessionsData())
  }, [dispatch])

  const arrangeSwiperItems = useMemo(
    () =>
      streamSessions.length === 0
        ? null
        : [
            streamSessions[3],
            streamSessions[1],
            streamSessions[0],
            streamSessions[2],
            streamSessions[4],
          ],
    [streamSessions],
  )

  const params = {
    effect: 'coverflow',
    activeSlideKey: '2',
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 50,
      depth: 300,
      modifier: 1,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  }

  return (
    <>
      <Box p={{ base: 1, sm: 5 }}>
        {arrangeSwiperItems && (
          <Swiper {...params}>
            {arrangeSwiperItems.map((streamSession: StreamSession, index: number) => (
              <StreamSliderItem key={index} data={streamSession} />
            ))}
          </Swiper>
        )}
      </Box>
      <Box px={5}>
        <Text fontSize="lg" fontWeight="bold" my={3}>
          Popular live channels
        </Text>
        <Flex overflowX="auto">
          <HStack>
            {streamSessions &&
              streamSessions.map((streamSession: StreamSession) => (
                <StreamItem key={streamSession.id} data={streamSession} px={1} />
              ))}
          </HStack>
        </Flex>
      </Box>
      <Box p={5}>
        <Text fontSize="lg" fontWeight="bold" mb={3}>
          <Link as={ReactLink} color={COLOR.DIAMOND} to={PATH.BROWSE}>
            Categories
          </Link>{' '}
          we think you’ll like
        </Text>
        <Flex overflowX="auto">
          <HStack>
            {categories.map((category: Category) => (
              <CategoryItem
                key={category.id}
                category={category}
                px={1}
                pb={3}
                w={{ base: 40, lg: 48 }}
              />
            ))}
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default Home
