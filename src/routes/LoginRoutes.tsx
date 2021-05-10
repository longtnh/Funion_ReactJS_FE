import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import { PATH } from '@/constants/paths'
const Login = lazy(() => import('@/pages/Login/Login'))

const LoginRoutes = () => (
  <Switch>
    <Route exact path={PATH.LOGIN}>
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    </Route>
  </Switch>
)
export default LoginRoutes
