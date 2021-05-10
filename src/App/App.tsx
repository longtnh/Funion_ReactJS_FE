import React from 'react'
import Routes from '@/routes/routes'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import 'focus-visible/dist/focus-visible'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  )
}

export default App
