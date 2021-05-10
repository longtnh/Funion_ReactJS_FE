import * as actions from './profileedit.constants'

const initialState = {
  userInfo: {} as User,
  isLoading: false,
  errorMessage: '',
  infoMessage: '',
}

const profileEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
        info: null,
      }
    }
    case actions.PROFILE_UPDATE: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case actions.PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        info: 'Update info success!',
      }
    }
    case actions.PROFILE_IMAGE_UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userInfo: { ...state.userInfo, profile_image: action.payload },
      }
    }
    case actions.PROFILE_BANNER_UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userInfo: { ...state.userInfo, banner_image: action.payload },
      }
    }
    case actions.PROFILE_UPDATE_FAIL: {
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

export default profileEditReducer
