import { getStreamSessionsApi } from '@/apis/stream.api'
import * as actions from './home.action'

export const getStreamSessionsData = () => dispatch => {
  return getStreamSessionsApi().then(res => {
    return dispatch(actions.getStreamSuccess(res))
  })
}
