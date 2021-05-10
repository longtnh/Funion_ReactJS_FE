import * as actions from './adminSubEvent.constants'

export const addSubEventSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.ADD_SUBEVENT_SUCCESS,
    payload,
  })
}
export const deleteSubEventSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.DELETE_SUBEVENT_SUCCESS,
    payload,
  })
}
