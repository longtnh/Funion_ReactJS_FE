import React from 'react'
import { Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { COLOR } from '@/constants/styles'

const MenuItem = ({ children, ...props }) => (
  <Link
    as={ReactLink}
    to={props.to}
    display="block"
    mt={{ base: 4, md: 0 }}
    ml={{ base: 0, md: 3, lg: 6 }}
    fontWeight="bold"
    fontSize={{ base: 'md', lg: 'lg' }}
    color={props.selected && COLOR.PRIMARY}
    {...props}
  >
    {children}
  </Link>
)

export default React.memo(MenuItem)
