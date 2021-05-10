import * as actions from './login.actions'
import { loginApi, loginByGoogleApi } from '@/apis/auth.api'

export const login = (payload: ReqLogin) => dispatch => {
  dispatch(actions.loginRequested())
  return loginApi(payload)
    .then((res: ResLoginApi) => {
      return dispatch(actions.loginSuccess(res))
    })
    .catch(err => {
      return dispatch(actions.loginFailed(err))
    })
}

export const loginByGoogle = (payload: ReqExternalLogin) => dispatch => {
  dispatch(actions.loginRequested())
  return loginByGoogleApi(payload)
    .then((res: ResLoginApi) => {
      return dispatch(actions.loginSuccess(res))
    })
    .catch(err => {
      return dispatch(actions.loginFailed(err))
    })
}
