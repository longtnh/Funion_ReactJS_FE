import Loading from '@/components/Loading/Loading'
import { PATH } from '@/constants/paths'
import AuthenticatedGuard from '@/guards/AuthenticatedGuard'
import MainLayout from '@/layouts/MainLayout'
import React, { lazy, Suspense } from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
const Home = lazy(() => import('@/pages/Home/Home'))
const Following = lazy(() => import('@/pages/Following/Following'))
const Browse = lazy(() => import('@/pages/Browse/Browse'))
const Event = lazy(() => import('@/pages/Event/Event'))
const Search = lazy(() => import('@/pages/Search/Search'))
const ProfileEdit = lazy(() => import('@/pages/ProfileEdit/ProfileEdit'))
const StreamView = lazy(() => import('@/pages/StreamView/StreamView'))
const Payment = lazy(() => import('@/pages/Payment/Payment'))
const ProfileView = lazy(() => import('@/pages/ProfileView/ProfileView'))
const BrowseItem = lazy(() => import('@/pages/BrowseItem/BrowseItem'))

const HomeRoutes = () => {
  let { path } = useRouteMatch()
  path = path.replace(/\/$/, '')
  const LoadingForSubScreen = <Loading h="calc(100vh - 50px)" />

  return (
    <MainLayout>
      <Switch>
        <AuthenticatedGuard
          exact
          path={`${path}/`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <Home />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.BROWSE_ITEM}/:categoryId`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <BrowseItem />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.BROWSE}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <Browse />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.PROFILE_EDIT}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <ProfileEdit />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.STREAM_VIEW}/:streamSessionId`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <StreamView />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.EVENT}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <Event />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.FOLLOWING}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <Following />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.PAYMENT}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <Payment />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.PROFILE_VIEW}/:userId`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <ProfileView />
            </Suspense>
          )}
        />
        <AuthenticatedGuard
          path={`${path}${PATH.SEARCH}`}
          component={() => (
            <Suspense fallback={LoadingForSubScreen}>
              <Search />
            </Suspense>
          )}
        />
      </Switch>
    </MainLayout>
  )
}
export default HomeRoutes
