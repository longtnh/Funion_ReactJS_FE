import { getStreamAdminApi } from '@/apis/admin.api'
import * as actions from './adminStream.action'

export const getStreamAdmin = () => dispatch => {
  return getStreamAdminApi().then(res => {
    return dispatch(actions.getStreamSuccess(res))
  })
}
