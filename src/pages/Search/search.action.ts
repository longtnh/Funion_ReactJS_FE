import * as actions from './search.constants'

export const getStreamSearchSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_STREAM_SEARCH_SUCCESS,
    payload,
  })
}
export const getUserSearchSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_USER_SEARCH_SUCCESS,
    payload,
  })
}
export const getCategorySearchSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_CATEGORIES_SEARCH_SUCCESS,
    payload,
  })
}
