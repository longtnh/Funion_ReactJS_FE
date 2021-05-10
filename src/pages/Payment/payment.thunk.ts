import { getUserPayment } from '@/apis/payment.api'
import * as actions from './payment.action'

export const getPaymentData = () => dispatch => {
  return getUserPayment().then(res => {
    return dispatch(actions.getPaymentSuccess(res))
  })
}
