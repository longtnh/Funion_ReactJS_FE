import { getStreamByIdApi } from '@/apis/stream.api'
import { followUserApi, unFollowUserApi } from '@/apis/user.api'
import { getUserPayment, donate } from '@/apis/payment.api'
import * as actions from './streamView.actions'

export const getStreamById = streamSessionId => dispatch => {
  return getStreamByIdApi(streamSessionId).then(res => {
    return dispatch(actions.getStreamSuccess(res))
  })
}
export const followUser = (targetId: string) => dispatch => {
  return followUserApi(targetId).then(() => {
    return dispatch(actions.followUserSuccess())
  })
}
export const unFollowUser = (targetId: string) => dispatch => {
  return unFollowUserApi(targetId).then(() => {
    return dispatch(actions.unFollowUserSuccess())
  })
}

export const getPaymentData = () => dispatch => {
  return getUserPayment().then(res => {
    return dispatch(actions.getPaymentSuccess(res))
  })
}

export const donateUser = (
  amount: number,
  receiveUserId: string,
  streamSessionId: string,
  username: string,
  message: string,
) => dispatch => {
  return donate(amount, receiveUserId, streamSessionId, username, message).then(res => {
    return dispatch(actions.donateUser(res))
  })
}
