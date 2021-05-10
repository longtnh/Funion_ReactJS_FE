import * as actions from './payment.constants'

const initialState = {
  payments: {} as Payment,
  momoUrl: {},
}

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_PAYMENT_SUCCESS: {
      return {
        ...state,
        payments: action.payload,
      }
    }
    case actions.ADD_PAYMENT_MOMO_SUCCESS: {
      return {
        ...state,
        momoUrl: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default paymentReducer
