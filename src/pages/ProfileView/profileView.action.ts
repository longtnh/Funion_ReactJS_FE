import * as actions from './profileView.constants'

export const getUserInfoSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_INFO_SUCCESS,
    payload,
  })
}
export const getMostPlayGamesSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_MOST_PLAY_GAMES_SUCCESS,
    payload,
  })
}
export const followUserSuccess = () => async dispatch => {
  return dispatch({
    type: actions.FOLLOW_SUCCESS,
  })
}
export const unFollowUserSuccess = () => async dispatch => {
  return dispatch({
    type: actions.UN_FOLLOW_SUCCESS,
  })
}
