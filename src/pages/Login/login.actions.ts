import { getCurrentUserInfo } from '@/App/App.thunk'
import * as actions from './login.constants'

export const loginRequested = () => ({
  type: actions.LOGIN_REQUESTED,
})

export const loginSuccess = res => dispatch => {
  localStorage.setItem('token', res.access_token)
  localStorage.setItem('role', res.role)
  dispatch(getCurrentUserInfo())
  return dispatch({
    type: actions.LOGIN_SUCCESS,
  })
}

export const loginFailed = error => ({
  type: actions.LOGIN_FAIL,
  error,
})
