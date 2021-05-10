import * as actions from './event.constants'

export const getTopCategoriesSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_TOP_CATEGORIES_SUCCESS,
    payload,
  })
}

export const getEventsSuccess = (res, followingMaps) => async dispatch => {
  return dispatch({
    type: actions.LOAD_EVENTS_SUCCESS,
    res,
    followingMaps,
  })
}

export const followEventSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.FOLLOW_EVENT_SUCCESS,
    payload,
  })
}

export const unFollowEventSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.UNFOLLOW_EVENT_SUCCESS,
    payload,
  })
}
