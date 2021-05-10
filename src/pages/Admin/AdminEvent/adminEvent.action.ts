import * as actions from './adminEvent.constants'

export const banButton = () => async dispatch => {
  return dispatch({
    type: actions.BAN_BUTTON,
  })
}
export const getEventSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_EVENT_SUCCESS,
    payload,
  })
}
export const getEventSearchSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_EVENT_SEARCH_SUCCESS,
    payload,
  })
}
export const createEventSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.CREATE_EVENT_SUCCESS,
    payload,
  })
}
