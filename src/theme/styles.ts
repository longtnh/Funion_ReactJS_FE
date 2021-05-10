import { COLOR } from '@/constants/styles'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      color: mode('gray.800', '#fff')(props),
      bg: mode('#fff', COLOR.DARK_MODE_BG)(props),
    },
  }),
}

export default styles
