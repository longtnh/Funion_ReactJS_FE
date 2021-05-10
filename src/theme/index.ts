// theme.js
import { extendTheme } from '@chakra-ui/react'
import styles from './styles'

const overrides = {
  styles,
  components: {
    Button: {
      baseStyle: {},
    },
  },
}

export default extendTheme(overrides)
