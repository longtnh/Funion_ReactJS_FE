import * as actions from './login.constants'

const initialState = {
  isLoading: false,
  error: '',
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actions.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case actions.LOGIN_FAIL: {
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

export default loginReducer
