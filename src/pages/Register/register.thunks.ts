import * as actions from './register.actions'
import { register } from '@/apis/user.api'

export const registerAccount = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
) => dispatch => {
  dispatch(actions.registerRequested())
  return register(email, password, confirmPassword, name)
    .then(res => {
      return dispatch(actions.registerSuccess(res))
    })
    .catch(err => {
      return dispatch(actions.registerFailed(err))
    })
}
