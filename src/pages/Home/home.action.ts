import * as actions from './home.constants'

export const getStreamSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_STREAM_SUCCESS,
    payload,
  })
}
