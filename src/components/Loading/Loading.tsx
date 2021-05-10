import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import logo from '@/assets/images/logo.png'

const Loading = props => (
  <Flex h="100vh" w="full" justify="center" align="center" {...props}>
    <Box boxSize={52}>
      <img src={logo} alt="logo" />
    </Box>
  </Flex>
)

export default Loading
