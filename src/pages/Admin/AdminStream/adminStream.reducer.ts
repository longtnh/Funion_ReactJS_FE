import * as actions from './adminStream.constants'

const initialState = {
  streams: [
    {
      streamID: '',
      title: '',
      status: '',
      category: '',
      viewersCount: '',
      createdTime: '',
    },
  ],
  isBan: false,
}

const adminStreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_STREAM_SUCCESS: {
      return {
        ...state,
        streams: action.payload,
      }
    }
    case actions.BAN_BUTTON: {
      return {
        ...state,
        isBan: !state.isBan,
      }
    }
    default: {
      return state
    }
  }
}

export default adminStreamReducer
