import * as actions from './streamView.constants'
import { TOGGLE_CHAT_BOX } from './streamView.constants'

const initialState = {
  streamSession: null as StreamSession | null,
  isChatBoxCollapsed: false,
  isFollowing: false,
  payments: {} as Payment,
}

const streamViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHAT_BOX: {
      return {
        ...state,
        isChatBoxCollapsed: !state.isChatBoxCollapsed,
      }
    }
    case actions.GET_STREAM_VIEW_SUCCESS: {
      return {
        ...state,
        streamSession: action.payload,
        isFollowing: action.payload.isFollowing,
      }
    }
    case actions.FOLLOW_SUCCESS: {
      return {
        ...state,
        isFollowing: true,
      }
    }
    case actions.UN_FOLLOW_SUCCESS: {
      return {
        ...state,
        isFollowing: false,
      }
    }
    case actions.LOAD_PAYMENT_SUCCESS: {
      return {
        ...state,
        payments: action.payload,
      }
    }
    case actions.DONATE: {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

export default streamViewReducer
