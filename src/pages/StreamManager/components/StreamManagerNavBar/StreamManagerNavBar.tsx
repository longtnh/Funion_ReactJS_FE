import React, { useCallback } from 'react'
import {
  Flex,
  Box,
  Text,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  Switch,
  Image,
  useColorMode,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logOut } from '@/App/App.actions'
import { PATH } from '@/constants/paths'
import { RiMoonLine, RiSettings3Line, RiLogoutBoxRLine, RiHomeLine } from 'react-icons/ri'

const StreamManagerNavBar = ({ viewCount, followerCount, ...extraProps }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { toggleColorMode } = useColorMode()
  const currentUser = useSelector((state: AppState) => state.app.currentUser)
  const profileImage = process.env.IDENTITY_ENDPOINT?.concat(currentUser.profile_image)

  const handleLogout = useCallback(() => {
    dispatch(logOut())
    history.push(PATH.LOGIN)
  }, [dispatch, history])

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
      {...extraProps}
    >
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Stream Manager
        </Text>
      </Box>
      <Box alignItems="center">
        <HStack>
          <Box w={24} align="center" borderWidth="1px" borderRadius="lg" fontSize="sm">
            <Text fontWeight="bold">{viewCount}</Text>
            <Text>Viewers</Text>
          </Box>
          <Box w={24} align="center" borderWidth="1px" borderRadius="lg" fontSize="sm">
            <Text fontWeight="bold">{followerCount}</Text>
            <Text>Followers</Text>
          </Box>
        </HStack>
      </Box>
      <Box>
        <Menu>
          <MenuButton>
            <Avatar size="sm" src={profileImage} />
          </MenuButton>
          <MenuList>
            <Box>
              <HStack>
                <Avatar size="sm" src={profileImage} ml={3} />
                <Text>{currentUser.name}</Text>
              </HStack>
            </Box>
            <MenuDivider />
            <MenuItem onClick={() => history.push(PATH.HOME)}>
              <RiHomeLine />
              <Text ml={3}>Back to Home</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <RiSettings3Line />
              <Text ml={3}>Setting</Text>
            </MenuItem>
            <Box display="inline-block" ml={3}>
              <Image as={RiMoonLine} float="left" mt={1} mr={3} />
              Dark/Light Mode
              <Switch onChange={() => toggleColorMode()} ml={3} />
            </Box>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>
              <RiLogoutBoxRLine />
              <Text ml={3}>Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
export default React.memo(StreamManagerNavBar)
