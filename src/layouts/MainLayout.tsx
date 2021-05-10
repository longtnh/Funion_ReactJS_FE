import React, { ReactNode } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import { useSelector } from 'react-redux'

interface Props {
  children: ReactNode
}

const MainLayout = (props: Props) => {
  const { children } = props
  const isSideBarCollapsed = useSelector(
    (state: AppState) => state.app.isSideBarCollapsed,
  )

  return (
    <>
      <NavBar />
      <HStack pos="fixed" w="full" h="calc(100vh - 50px)" spacing={0}>
        <SideBar />
        <Box
          h="calc(100vh - 50px)"
          w={{
            base: 'calc(100vw)',
            xl: isSideBarCollapsed ? 'calc(100vw - 50px)' : 'calc(100vw - 250px)',
          }}
          overflowY="auto"
          pb={{ base: 16, md: 0 }}
        >
          {children}
        </Box>
      </HStack>
    </>
  )
}

export default MainLayout
