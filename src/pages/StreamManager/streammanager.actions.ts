import * as actions from './streammanager.constants'

export const getTagSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_TAG_SUCCESS,
    payload,
  })
}

export const getStreamConfigSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_STREAM_CONFIG_SUCCESS,
    payload,
  })
}

export const getStreamerMediaSourceSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_STREAM_MEDIA_SOURCE_SUCCESS,
    payload,
  })
}

export const addNewStreamSession = payload => async dispatch => {
  return dispatch({
    type: actions.ADD_NEW_STREAM_SESSION,
    payload,
  })
}

export const startPublishingStreamSession = () => async dispatch => {
  return dispatch({
    type: actions.PUBLISH_STREAM_SESSION_REQUESTED,
  })
}

export const publishStreamSessionSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.PUBLISH_STREAM_SESSION_SUCCESS,
    payload,
  })
}

export const publishingStreamSessionFail = () => async dispatch => {
  return dispatch({
    type: actions.PUBLISH_STREAM_SESSION_FAIL,
  })
}

export const finishStreamSessionSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.FINISH_STREAM_SESSION_SUCCESS,
    payload,
  })
}

export const clearPushNotifications = () => async dispatch => {
  return dispatch({
    type: actions.CLEAR_PUSH_NOTIFICATIONS,
  })
}

export const getCategorySuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_CATEGORY_SUCCESS,
    payload,
  })
}
