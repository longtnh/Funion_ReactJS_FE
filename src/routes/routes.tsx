import { PATH } from '@/constants/paths'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdminRoutes from './AdminRoutes'
import HomeRoutes from './HomeRoutes'
import LoginRoutes from './LoginRoutes'
import RegisterRoutes from './RegisterRoutes'
import StreamManagerRoutes from './StreamManagerRoutes'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route strict path={PATH.LOGIN}>
          <LoginRoutes />
        </Route>
        <Route strict path={PATH.REGISTER}>
          <RegisterRoutes />
        </Route>
        <Route strict path={PATH.STREAM_MANAGER}>
          <StreamManagerRoutes />
        </Route>
        <Route strict path={PATH.ADMIN}>
          <AdminRoutes />
        </Route>
        <Route strict path={PATH.HOME}>
          <HomeRoutes />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Routes
