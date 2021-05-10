import * as actions from './profileedit.constants'

export const getProfileSuccess = (payload: User) => async dispatch => {
  return dispatch({
    type: actions.GET_PROFILE_SUCCESS,
    payload,
  })
}

export const profileUpdating = () => ({
  type: actions.PROFILE_UPDATE,
})

export const profileUpdateSuccess = () => async dispatch => {
  return dispatch({
    type: actions.PROFILE_UPDATE_SUCCESS,
  })
}

export const profileImageUpdateSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.PROFILE_IMAGE_UPDATE_SUCCESS,
    payload,
  })
}
export const bannerImageUpdateSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.PROFILE_BANNER_UPDATE_SUCCESS,
    payload,
  })
}
export const profileUpdateFailed = error => ({
  type: actions.PROFILE_UPDATE_FAIL,
  error,
})
