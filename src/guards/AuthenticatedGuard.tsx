import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { PATH } from '@/constants/paths'
import { ROLE } from '@/constants/roles'

const AuthenticatedGuard = props => {
  const { component: Component, admin = false, ...rest } = props
  const isAuthenticated = useSelector((state: AppState) => state.app.isAuthenticated)

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated && !localStorage.getItem('token'))
          return <Redirect to={PATH.LOGIN} />
        else if (admin && localStorage.getItem('role') !== ROLE.ADMIN)
          return <Redirect to={PATH.HOME} />
        else return <Component {...props} />
      }}
    />
  )
}

export default AuthenticatedGuard
