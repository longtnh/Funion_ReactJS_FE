import * as actions from './BrowseItem.constants'

export const getBrowseItemSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_BROWSE_ITEM_SUCCESS,
    payload,
  })
}
export const getStreamSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_CATEGORY_STREAM_SUCCESS,
    payload,
  })
}
