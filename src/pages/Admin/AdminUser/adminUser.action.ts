import * as actions from './adminUser.constants'

export const banButton = () => async dispatch => {
  return dispatch({
    type: actions.BAN_BUTTON,
  })
}
export const getUserSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_USER_SUCCESS,
    payload,
  })
}
