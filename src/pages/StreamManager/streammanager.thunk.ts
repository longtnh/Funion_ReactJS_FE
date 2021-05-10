import { getCategoryByIdApi } from '@/apis/category.api'
import {
  finishStreamSessionApi,
  getStreamConfigApi,
  getStreamerMediaSourceApi,
  publishStreamSessionApi,
} from '@/apis/stream.api'
import { getTagApi } from '@/apis/tag.api'
import * as actions from './streammanager.actions'

export const getTagData = () => dispatch => {
  return getTagApi().then(res => {
    return dispatch(actions.getTagSuccess(res))
  })
}

export const getStreamConfig = () => dispatch => {
  return getStreamConfigApi().then(res => {
    return dispatch(actions.getStreamConfigSuccess(res))
  })
}

export const getStreamerMediaSource = () => dispatch => {
  return getStreamerMediaSourceApi().then(res => {
    return dispatch(actions.getStreamerMediaSourceSuccess(res))
  })
}

export const publishStreamSession = (data: ReqStreamSession) => dispatch => {
  dispatch(actions.startPublishingStreamSession())
  return publishStreamSessionApi(data)
    .then(res => {
      return dispatch(actions.publishStreamSessionSuccess(data))
    })
    .catch(e => {
      dispatch(actions.publishingStreamSessionFail())
    })
}

export const finishStreamSession = () => dispatch => {
  return finishStreamSessionApi().then(res => {
    return dispatch(actions.finishStreamSessionSuccess(res))
  })
}

export const getCategory = (categoryId: string) => dispatch => {
  return getCategoryByIdApi(categoryId).then(res => {
    return dispatch(actions.getCategorySuccess(res))
  })
}
