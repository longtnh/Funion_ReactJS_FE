import * as actions from './adminEvent.constants'

const initialState = {
  event: [] as Event[],
  eventSearch: [] as Event[],
  isBan: false,
}

const adminEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_EVENT_SUCCESS: {
      return {
        ...state,
        event: action.payload,
      }
    }
    case actions.BAN_BUTTON: {
      return {
        ...state,
        isBan: !state.isBan,
      }
    }
    case actions.LOAD_EVENT_SEARCH_SUCCESS: {
      return {
        ...state,
        eventSearch: action.payload,
      }
    }
    case actions.CREATE_EVENT_SUCCESS: {
      return {
        ...state,
        event: [...state.event, action.payload],
      }
    }
    default: {
      return state
    }
  }
}

export default adminEventReducer
