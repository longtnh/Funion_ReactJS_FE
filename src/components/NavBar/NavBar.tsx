/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Image,
  Text,
  ButtonGroup,
  Input,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  Spacer,
  IconButton,
  Switch,
  Center,
  Avatar,
  Link as ChakraLink,
  AvatarBadge,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { BsCameraVideoFill } from 'react-icons/bs'
import { BiGhost } from 'react-icons/bi'
import {
  RiWalletLine,
  RiSettings3Line,
  RiMoonLine,
  RiLogoutBoxRLine,
  RiSearchLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri'
import { BiNotification } from 'react-icons/bi'
import { MdMenu } from 'react-icons/md'
import { ImProfile } from 'react-icons/im'
import { logOut } from '@/App/App.actions'
import logo from '@/assets/images/logo.png'
import MenuItemNav from './MenuItem/MenuItem'
import { PATH } from '@/constants/paths'
import { COLOR } from '@/constants/styles'
import NotificationItem from './NotificationItem/NotificationItem'
import { useNotificationHub } from '@/hooks/NotificationHubHooks'

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentPath = useLocation().pathname
  const { colorMode, toggleColorMode } = useColorMode()
  const notifications = useSelector((state: AppState) => state.app.notifications)
  const currentUser = useSelector((state: AppState) => state.app.currentUser)
  const profileImage = process.env.IDENTITY_ENDPOINT?.concat(currentUser.profile_image)
  const [keywordSearch, setKeywordSearch] = useState('')
  const [unReadNotiCount, setUnReadedNotiCount] = useState(0)

  useEffect(() => {
    if (notifications && notifications.length !== 0) {
      setUnReadedNotiCount(unReadNotiCount + 1)
    }
  }, [notifications])

  let { url } = useRouteMatch()
  url = url.replace(/\/$/, '')

  // Connect notification hub
  useNotificationHub()

  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  const handleLogout = useCallback(() => {
    dispatch(logOut())
    history.push(PATH.LOGIN)
  }, [dispatch, history])

  const handleProfileClicked = useCallback(() => {
    history.push(PATH.PROFILE_EDIT)
  }, [history])

  const handleAdminClicked = useCallback(() => {
    history.push(PATH.ADMIN)
  }, [history])

  const handleSearchClicked = useCallback(() => {
    if (keywordSearch !== '') {
      history.push({
        pathname: PATH.SEARCH,
        search: '?temp=' + keywordSearch,
        state: keywordSearch,
      })
    }
  }, [history, keywordSearch])

  const handleEnterSearch = useCallback(
    event => {
      if (keywordSearch !== '') {
        if (event.key === 'Enter') {
          history.push({
            pathname: PATH.SEARCH,
            search: '?term=' + keywordSearch,
            state: keywordSearch,
          })
        }
      }
    },
    [history, keywordSearch],
  )

  return (
    <Flex
      w="full"
      px={4}
      py={1}
      align="center"
      justify="space-between"
      wrap="wrap"
      borderWidth="1px"
      boxShadow="sm"
    >
      <Box alignItems="center">
        <Link to={PATH.HOME}>
          <Image src={logo} boxSize={10}></Image>
        </Link>
      </Box>
      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <MdMenu size={30} color="gray.900" />
      </Box>
      <Flex
        display={{ base: show ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItemNav
          selected={currentPath === PATH.FOLLOWING}
          to={`${url}${PATH.FOLLOWING}`}
        >
          Following
        </MenuItemNav>
        <MenuItemNav selected={currentPath === PATH.BROWSE} to={`${url}${PATH.BROWSE}`}>
          Browse
        </MenuItemNav>
        <MenuItemNav selected={currentPath === PATH.EVENT} to={`${url}${PATH.EVENT}`}>
          Events
        </MenuItemNav>
        <MenuItemNav to={`${url}${PATH.PROFILE_EDIT}`} d={{ base: 'block', md: 'none' }}>
          Profile
        </MenuItemNav>
        <MenuItemNav to={`${url}${PATH.PAYMENT}`} d={{ base: 'block', md: 'none' }}>
          Recharge
        </MenuItemNav>
        <Spacer />

        {/* Search */}
        <Box w={{ base: 'full', md: '35%', lg: '30%' }} my={{ base: 4, md: 0 }}>
          <ButtonGroup w="full" size="md" isAttached>
            <Input
              borderLeftRadius="md"
              borderRightRadius="none"
              pl={4}
              placeholder="Search"
              onChange={e => setKeywordSearch(e.target.value)}
              onKeyDown={handleEnterSearch}
            />
            <IconButton
              aria-label="Search"
              icon={<RiSearchLine />}
              borderLeftRadius="none"
              borderRightRadius="md"
              onClick={handleSearchClicked}
            />
          </ButtonGroup>
        </Box>

        <Spacer />
        {/* Left Corner */}
        <Box display={{ base: 'none', md: 'flex' }}>
          <HStack spacing={{ md: '3' }}>
            {/* Notification */}
            <Center>
              <Menu isLazy>
                <MenuButton onClick={() => setUnReadedNotiCount(0)}>
                  <Avatar
                    icon={<BiNotification size={30} />}
                    size="sm"
                    color={
                      unReadNotiCount !== 0 ? COLOR.NOTIFICATION_RED : COLOR.GRAY_TEXT
                    }
                    bg="inherit"
                  >
                    {unReadNotiCount !== 0 && (
                      <AvatarBadge
                        boxSize="1.4em"
                        fontWeight="bold"
                        color="#fff"
                        bg={COLOR.NOTIFICATION_RED}
                      >
                        {unReadNotiCount}
                      </AvatarBadge>
                    )}
                  </Avatar>
                </MenuButton>
                <MenuList w={{ base: '28', md: '22rem' }} pb={0}>
                  <Box>
                    <Text fontWeight="bold" pl={4}>
                      Notifications
                    </Text>
                  </Box>
                  <MenuDivider />
                  <Box h="270px" overflowY="auto">
                    {notifications &&
                      notifications.map((notification, index) => (
                        <NotificationItem key={index} data={notification} />
                      ))}
                  </Box>
                </MenuList>
              </Menu>
            </Center>
            <Box>
              <Button
                as={Link}
                to={PATH.STREAM_MANAGER}
                bg={COLOR.LIVE_RED}
                color="white"
                size="sm"
                mr={3}
                _hover={{ bg: COLOR.LIVE_RED }}
              >
                <Center>
                  <BsCameraVideoFill size={20} color="white" />
                </Center>
                <Text display={{ base: 'none', lg: 'flex' }} ml={2}>
                  Go Live
                </Text>
              </Button>
              <Button
                as={Link}
                to={PATH.PAYMENT}
                bg="white"
                color={COLOR.DIAMOND}
                border="2px"
                borderColor={COLOR.DIAMOND}
                size="sm"
              >
                <Center>
                  <RiMoneyDollarCircleLine size={20} color={COLOR.DIAMOND} />
                </Center>
                <Text display={{ base: 'none', lg: 'flex' }} ml={2}>
                  Recharge
                </Text>
              </Button>
            </Box>
            {/* Menu Profile */}
            <Box>
              <Menu>
                <MenuButton>
                  <Avatar size="sm" src={profileImage} />
                </MenuButton>
                <MenuList>
                  <Box>
                    <HStack>
                      <Avatar size="sm" src={profileImage} ml={3} />
                      <Text maxW={150} fontWeight="bold" isTruncated>
                        {currentUser.name}
                      </Text>
                    </HStack>
                  </Box>
                  <MenuDivider />
                  {currentUser.role === 'admin' && (
                    <>
                      <MenuItem onClick={handleAdminClicked} fontWeight="medium">
                        <BiGhost />
                        <Text ml={3}>Admin</Text>
                      </MenuItem>
                      <MenuDivider />
                    </>
                  )}
                  <MenuItem onClick={handleProfileClicked} fontWeight="medium">
                    <ImProfile />
                    <ChakraLink ml={3}>Profile</ChakraLink>
                  </MenuItem>
                  <MenuItem>
                    <RiWalletLine />
                    <Text ml={3} fontWeight="medium">
                      <Link to={PATH.PAYMENT}>Wallet</Link>
                    </Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <RiSettings3Line />
                    <Text ml={3} fontWeight="medium">
                      Setting
                    </Text>
                  </MenuItem>
                  <Flex
                    align="center"
                    justify="space-between"
                    px={3}
                    py={2}
                    fontWeight="medium"
                  >
                    <Image as={RiMoonLine} />
                    Dark/Light Mode
                    <Switch
                      isChecked={colorMode === 'dark'}
                      onChange={() => toggleColorMode()}
                    />
                  </Flex>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout} fontWeight="medium">
                    <RiLogoutBoxRLine />
                    <Text ml={2}>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  )
}
export default React.memo(NavBar)
