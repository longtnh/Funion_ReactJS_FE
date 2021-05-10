import * as actions from './home.constants'

const initialState = {
  streamSessions: [] as StreamSession[],
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_STREAM_SUCCESS: {
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

export default homeReducer
