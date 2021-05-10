import * as actions from './register.constants'

export const registerRequested = () => ({
  type: actions.REGISTER_REQUESTED,
})

export const registerSuccess = mess => ({
  type: actions.REGISTER_SUCCESS,
  mess,
})

export const registerFailed = error => ({
  type: actions.REGISTER_FAIL,
  error,
})
