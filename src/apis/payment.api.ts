import { axiosT5 } from '@/axios/axiosTeam5'

export const getUserPayment = (): Promise<Payment> => {
  return axiosT5
    .get(`/payment-api/api/v1/Payment/currentUser`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export const donate = (
  amount: number,
  receiveUserId: string,
  streamSessionId: string,
  username: string,
  message: string,
) => {
  return axiosT5
    .post('/payment-api/api/v1/Donate', {
      type: 'Minus',
      amount: amount,
      receiverIdentityGuid: receiveUserId,
      streamSessionId: streamSessionId,
      userName: username,
      message: message,
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}
