import * as actions from './App.constants'

export const toggleSideBar = () => async dispatch => {
  return dispatch({
    type: actions.TOGGLE_SIDEBAR,
  })
}

export const getCurrentUserInfoSuccess = (payload: User) => async dispatch => {
  return dispatch({
    type: actions.GET_CURRENT_USER_INFO_SUCCESS,
    payload,
  })
}

export const getFollowingStreamSessionSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.GET_FOLLOWING_STREAM_SESSION_SUCCESS,
    payload,
  })
}

export const getRecommendStreamSessionSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.GET_RECOMMEND_STREAM_SESSION_SUCCESS,
    payload,
  })
}

export const getFollowingUsersSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.GET_FOLLOWING_USERS_SUCCESS,
    payload,
  })
}

// export const getNotificationSuccess = payload => async dispatch => {
//   return dispatch({
//     type: actions.GET_NOTIFICATIONS_SUCCESS,
//     payload,
//   })
// }
export const logOut = () => async dispatch => {
  return dispatch({
    type: actions.LOGOUT,
  })
}
export const addNewNotification = (payload: UserNotification) => async dispatch => {
  return dispatch({
    type: actions.ADD_NEW_NOTIFICATION,
    payload,
  })
}
