import React, { ReactNode } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import AdminNavBar from '@/components/NavBar/AdminNavBar'

interface Props {
  children: ReactNode
}

const AdminLayout = (props: Props) => {
  const { children } = props

  return (
    <>
      <AdminNavBar />
      <HStack pos="fixed" w="full" h="calc(100vh - 50px)" spacing={0}>
        <Box h="calc(100vh - 50px)" w="full" overflowY="auto">
          {children}
        </Box>
      </HStack>
    </>
  )
}

export default AdminLayout
