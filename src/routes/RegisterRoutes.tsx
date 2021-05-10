import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import { PATH } from '@/constants/paths'
const Register = lazy(() => import('@/pages/Register/Register'))

const RegisterRoutes = () => (
  <Switch>
    <Route exact path={PATH.REGISTER}>
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    </Route>
  </Switch>
)
export default RegisterRoutes
