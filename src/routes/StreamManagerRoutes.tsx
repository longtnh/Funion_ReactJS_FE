import React, { lazy, Suspense } from 'react'
import { Switch } from 'react-router-dom'
import Loading from '@/components/Loading/Loading'
import { PATH } from '@/constants/paths'
import AuthenticatedGuard from '@/guards/AuthenticatedGuard'
const StreamManager = lazy(() => import('@/pages/StreamManager/StreamManager'))

const StreamManagerRoutes = () => (
  <Switch>
    <AuthenticatedGuard
      exact
      path={PATH.STREAM_MANAGER}
      component={() => (
        <Suspense fallback={<Loading />}>
          <StreamManager />
        </Suspense>
      )}
    />
  </Switch>
)
export default StreamManagerRoutes
