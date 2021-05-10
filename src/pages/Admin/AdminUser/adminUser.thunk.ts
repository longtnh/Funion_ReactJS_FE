import { getUserAdminApi } from '@/apis/admin.api'
import * as actions from './adminUser.action'

export const getUserAdmin = () => dispatch => {
  return getUserAdminApi().then(res => {
    return dispatch(actions.getUserSuccess(res))
  })
}
