import Loading from '@/components/Loading/Loading'
import { PATH } from '@/constants/paths'
import AuthenticatedGuard from '@/guards/AuthenticatedGuard'
import AdminLayout from '@/layouts/AdminLayout'
import React, { lazy, Suspense } from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
const AdminUser = lazy(() => import('@/pages/Admin/AdminUser/AdminUser'))
const AdminStream = lazy(() => import('@/pages/Admin/AdminStream/AdminStream'))
const AdminEvent = lazy(() => import('@/pages/Admin/AdminEvent/AdminEvent'))
const AdminSubEvent = lazy(() => import('@/pages/Admin/AdminSubEvent/AdminSubEvent'))

const AdminRoutes = () => {
  let { path } = useRouteMatch()
  path = path.replace(/\/$/, '')
  const LoadingForSubScreen = <Loading h="full" />

  return (
    <AdminLayout>
      <Switch>
        <AuthenticatedGuard
          admin
          exact
          path={[`${path}/`, `${path}${PATH.ADMIN_USER}`]}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <AdminUser />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          admin
          path={`${path}${PATH.ADMIN_STREAM}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <AdminStream />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          admin
          path={`${path}${PATH.ADMIN_EVENT}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <AdminEvent />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          admin
          path={`${path}${PATH.ADMIN_SUB_EVENT}/:eventId`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <AdminSubEvent />
            </Suspense>
          )}
        />
      </Switch>
    </AdminLayout>
  )
}
export default AdminRoutes
