import * as actions from './browse.constants'

export const getCategoriesRequested = () => async dispatch => {
  return dispatch({
    type: actions.LOAD_CATEGORIES_REQUESTED,
  })
}
export const updateSearchTagIds = payload => async dispatch => {
  return dispatch({
    type: actions.UPDATE_SEARCH_TAG_IDS,
    payload,
  })
}
export const getCategoriesSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_CATEGORIES_SUCCESS,
    payload,
  })
}

export const getCategoriesFail = () => async dispatch => {
  return dispatch({
    type: actions.LOAD_CATEGORIES_FAIL,
  })
}

export const getTagSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_TAG_SUCCESS,
    payload,
  })
}
