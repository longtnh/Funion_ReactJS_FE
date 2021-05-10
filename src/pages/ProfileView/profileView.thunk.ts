import {
  getInfoByIdApi,
  getMostPlayGamesApi,
  followUserApi,
  unFollowUserApi,
} from '@/apis/user.api'
import { getFollowingStreamSession } from '@/App/App.thunk'
import * as actions from './profileView.action'

export const getInfoById = (infoId: string) => dispatch => {
  return getInfoByIdApi(infoId).then(res => {
    return dispatch(actions.getUserInfoSuccess(res))
  })
}
export const getMostPlayGames = () => dispatch => {
  return getMostPlayGamesApi().then(res => {
    return dispatch(actions.getMostPlayGamesSuccess(res))
  })
}
export const followUser = (currentId: string, targetId: string) => dispatch => {
  return followUserApi(targetId).then(() => {
    dispatch(getFollowingStreamSession(currentId))
    return dispatch(actions.followUserSuccess())
  })
}
export const unFollowUser = (currentId: string, targetId: string) => dispatch => {
  return unFollowUserApi(targetId).then(() => {
    dispatch(getFollowingStreamSession(currentId))
    return dispatch(actions.unFollowUserSuccess())
  })
}
