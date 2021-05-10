import * as actions from './event.constants'

const initialState = {
  topCategories: [] as Category[],
  events: [] as Schedule[],
  followingMaps: {},
}

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_TOP_CATEGORIES_SUCCESS: {
      return {
        ...state,
        topCategories: action.payload,
      }
    }
    case actions.LOAD_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.res,
        followingMaps: action.followingMaps,
      }
    }
    case actions.FOLLOW_EVENT_SUCCESS: {
      return {
        ...state,
        followingMaps: { ...state.followingMaps, [action.payload]: true },
      }
    }
    case actions.UNFOLLOW_EVENT_SUCCESS: {
      return {
        ...state,
        followingMaps: { ...state.followingMaps, [action.payload]: false },
      }
    }
    default: {
      return state
    }
  }
}

export default EventReducer
