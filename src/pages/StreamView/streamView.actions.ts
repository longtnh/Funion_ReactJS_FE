import * as actions from './streamView.constants'

export const getStreamSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.GET_STREAM_VIEW_SUCCESS,
    payload,
  })
}
export const toggleChatBox = () => async dispatch => {
  return dispatch({
    type: actions.TOGGLE_CHAT_BOX,
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

export const getPaymentSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_PAYMENT_SUCCESS,
    payload,
  })
}

export const donateUser = payload => async dispatch => {
  return dispatch({
    type: actions.DONATE,
    payload,
  })
}
