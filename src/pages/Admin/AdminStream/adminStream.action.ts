import * as actions from './adminStream.constants'

export const banButton = () => async dispatch => {
  return dispatch({
    type: actions.BAN_BUTTON,
  })
}
export const getStreamSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_STREAM_SUCCESS,
    payload,
  })
}
