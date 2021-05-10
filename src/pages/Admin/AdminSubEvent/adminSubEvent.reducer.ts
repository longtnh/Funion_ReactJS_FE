import * as actions from './adminSubEvent.constants'

const initialState = {
  subEvent: [] as SubEvent[],
}

const adminSubEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_SUBEVENT_SUCCESS: {
      return {
        ...state,
        // subEvent: [...state.subEvent, action.payload],
      }
    }
    case actions.DELETE_SUBEVENT_SUCCESS: {
      return {
        ...state,
        // subEvent: [...state.subEvent.filter(se => se !== action.payload)],
      }
    }
    default: {
      return state
    }
  }
}

export default adminSubEventReducer
