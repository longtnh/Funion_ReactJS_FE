import * as actions from './following.constants'

export const getStreamSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_LIVE_CHANNELS_FOLLOWING,
    payload,
  })
}
