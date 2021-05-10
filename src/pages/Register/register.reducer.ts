import * as actions from './register.constants'

const initialState = {
  isLoading: false,
  error: '',
  mess: '',
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REGISTER_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actions.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        mess: 'success',
      }
    }
    case actions.REGISTER_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    }
    default: {
      return state
    }
  }
}

export default registerReducer
