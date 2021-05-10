import * as actions from './following.constants'

const initialState = {
  streamSessions: [] as StreamSession[],
}
const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_LIVE_CHANNELS_FOLLOWING: {
      return {
        ...state,
        streamSessions: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default followingReducer
