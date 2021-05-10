import { getFollowingUsersApi } from '@/apis/channel.api'
import {
  getFollowingStreamSessionsApi,
  getRecommendStreamSessionsApi,
} from '@/apis/stream.api'
import { getCurrentUserInfoApi } from '@/apis/user.api'
import * as actions from './App.actions'

export const getFollowingStreamSession = (userId: string) => dispatch => {
  return getFollowingUsersApi(userId).then(res => {
    dispatch(actions.getFollowingUsersSuccess(res))
    const userId = [] as string[]
    Object.entries(res).map(([key, value]) => userId.push(key))
    return getFollowingStreamSessionsApi(userId).then(res => {
      return dispatch(actions.getFollowingStreamSessionSuccess(res))
    })
  })
}

export const getRecommendStreamSession = () => dispatch => {
  return getRecommendStreamSessionsApi().then(res => {
    return dispatch(actions.getRecommendStreamSessionSuccess(res))
  })
}

// export const getNotificationsData = () => dispatch => {
//   return getNotificationsApi().then(res => {
//     return dispatch(actions.getNotificationSuccess(res))
//   })
// }

export const getCurrentUserInfo = () => dispatch => {
  return getCurrentUserInfoApi().then((res: User) => {
    return dispatch(actions.getCurrentUserInfoSuccess(res))
  })
}
