import * as actions from './payment.constants'

export const getPaymentSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.LOAD_PAYMENT_SUCCESS,
    payload,
  })
}

export const paymentMomoAddSuccess = payload => async dispatch => {
  return dispatch({
    type: actions.ADD_PAYMENT_MOMO_SUCCESS,
    payload,
  })
}
