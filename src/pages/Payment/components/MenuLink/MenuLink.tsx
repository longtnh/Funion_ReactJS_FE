import React from 'react'
import { Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

const MenuLink = ({ children, ...props }) => (
  <Link
    as={ReactLink}
    display="block"
    mr={{ base: 0, md: 3, lg: 6 }}
    to={props.to}
    fontWeight="bold"
    fontSize="lg"
    {...props}
  >
    {children}
  </Link>
)

export default MenuLink
