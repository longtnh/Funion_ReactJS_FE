import React, { useCallback, useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Image,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  Spacer,
  Switch,
  Avatar,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { RiSettings3Line, RiMoonLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { MdMenu } from 'react-icons/md'
import { ImProfile } from 'react-icons/im'
import { logOut } from '@/App/App.actions'
import logo from '@/assets/images/logo.png'
import MenuItemNav from './MenuItem/MenuItem'
import { PATH } from '@/constants/paths'

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentPath = useLocation().pathname
  const { toggleColorMode } = useColorMode()
  const currentUser = useSelector((state: AppState) => state.app.currentUser)
  const profileImage = process.env.IDENTITY_ENDPOINT?.concat(currentUser.profile_image)

  let { url } = useRouteMatch()
  url = url.replace(/\/$/, '')

  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  const handleLogout = useCallback(() => {
    dispatch(logOut())
    history.push(PATH.LOGIN)
  }, [dispatch, history])

  const handleProfileClicked = useCallback(() => {
    history.push(PATH.PROFILE_EDIT)
  }, [history])

  useEffect(() => {}, [dispatch])

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
          selected={currentPath === PATH.ADMIN_USER}
          to={`${url}${PATH.ADMIN_USER}`}
        >
          Users
        </MenuItemNav>
        <MenuItemNav
          selected={currentPath === PATH.ADMIN_STREAM}
          to={`${url}${PATH.ADMIN_STREAM}`}
        >
          Stream
        </MenuItemNav>
        <MenuItemNav
          selected={currentPath === PATH.ADMIN_EVENT}
          to={`${url}${PATH.ADMIN_EVENT}`}
        >
          Events
        </MenuItemNav>
        <Spacer />
        {/* Left Corner */}
        <Box display={{ base: 'none', md: 'flex' }}>
          <HStack spacing={0}>
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
                  <MenuItem onClick={handleProfileClicked} fontWeight="medium">
                    <ImProfile />
                    <ChakraLink ml={3}>Profile</ChakraLink>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem fontWeight="medium">
                    <RiSettings3Line />
                    <Text ml={3}>Setting</Text>
                  </MenuItem>
                  <Flex align="center" justify="space-between" px={3} py={2}>
                    <Image as={RiMoonLine} />
                    Dark/Light Mode
                    <Switch onChange={() => toggleColorMode()} />
                  </Flex>
                  <MenuDivider />
                  <MenuItem fontWeight="medium" onClick={handleLogout}>
                    <RiLogoutBoxRLine />
                    <Text ml={3}>Logout</Text>
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
export default NavBar
