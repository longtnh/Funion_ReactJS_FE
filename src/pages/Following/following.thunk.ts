import { getAllSessionByUserIdSApi } from '@/apis/stream.api'
import * as actions from './following.action'

export const getStreamSessionsFollowingData = () => dispatch => {
  return getAllSessionByUserIdSApi().then(res => {
    return dispatch(actions.getStreamSuccess(res))
  })
}
